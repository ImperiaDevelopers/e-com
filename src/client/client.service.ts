import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Response } from 'express';
import { InjectModel } from '@nestjs/sequelize';
import { Client } from './models/client.model';
import { Otp } from '../otp/models/otp.model';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { OtpService } from '../otp/otp.service';
import { dates, decode, encode } from '../common/helpers/crypto';
import * as bcrypt from 'bcrypt';
import * as otpGenerator from 'otp-generator';
import { AddMinutesToDate } from '../common/helpers/addMinutes';
import { IOtpType } from '../common/types/decode-otp.type';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { Order } from '../order/models/order.model';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client) private readonly clientRepo: typeof Client,
    @InjectModel(Otp) private readonly otpRepo: typeof Otp,
    private readonly jwtService: JwtService,
    private readonly otpService: OtpService,
  ) {}

  async createClient(createClientDto: CreateClientDto, res: Response) {
  
    const client =this.clientRepo.create(createClientDto)
  
    try {
      // await client.save();
    } catch (error) {
      console.log(error);
    }

    return client
  }

  async findAll({
    page = 1,
    limit = 10000000,
  }: {
    page?: number;
    limit?: number;
  }) {
    const offset = (page - 1) * limit;
    const client = await this.clientRepo.findAndCountAll({
      limit,
      offset,
      include: [{ all: true }],
    });
    return client;
  }

  async signInWithOtp(phone_number: string) {
    const client = Number(
      phone_number
        .split('')
        .filter((num) => !isNaN(+num))
        .join(''),
    );

    await this.otpService.auth();

    const decoded = await this.newOtp(client);
    if (!decoded) throw new BadRequestException('An error ocured...');
    return decoded;
  }

  async verifyOtpClient(verifyOtpDto: VerifyOtpDto, res: Response) {
    const { verification_key, otp, phone_number, userId } = verifyOtpDto;
    const check_number = phone_number;

    const obj: IOtpType = JSON.parse(await decode(verification_key));
    if (obj.phone_number != check_number) {
      throw new BadRequestException("Otp didn't send to this phone number");
    }

    let otpDB = await this.otpRepo.findOne({
      where: { phone_number: obj.phone_number },
    });

    if (!otpDB) {
      throw new BadRequestException('wrong one time password');
    }
    otpDB = otpDB.dataValues;

    if (otpDB) {
      if (!otpDB.verified) {
        if (dates.compare(otpDB.expiration_time, new Date())) {
          if (otpDB.otp === otp) {
            const client = await this.clientRepo.findOne({
              where: {
                phone_number: obj.phone_number,
              },
            });
            if (client) {
              await this.makeVerifyTrue(otpDB.unique_id);
              const tokens = await this.getTokens(client);
              client.hashed_token = await bcrypt.hash(tokens.refresh_token, 7);
              client.save();
              res.cookie('refresh_token', tokens.refresh_token, {
                maxAge: 15 * 21 * 60 * 60 * 1000,
                httpOnly: true,
              });

              const response = {
                client: client,
                tokens: tokens,
                role: 'client',
                status: 1,
              };
              return response;
            } else {
              const clientup = await this.clientRepo.update(
                {
                  phone_number: phone_number,
                  last_name: null,
                },
                { where: { first_name: userId } },
              );
              const client = await this.clientRepo.findOne({
                where: { first_name: userId },
              });
              const tokens = await this.getTokens(client);
              client.hashed_token = await bcrypt.hash(tokens.refresh_token, 7);
              client.save();

              res.cookie('refresh_token', tokens.refresh_token, {
                maxAge: 15 * 21 * 60 * 60 * 1000,
                httpOnly: true,
              });

              const response = {
                client: client,
                tokens: tokens,
                role: 'client',
                status: 0,
              };
              return response;
            }
          } else {
            throw new BadRequestException(`OTP is not matching`);
          }
        } else {
          throw new BadRequestException('OTP already expired');
        }
      } else {
        throw new BadRequestException('OTP already verified');
      }
    } else {
      throw new BadRequestException('Such an OTP is not available');
    }
  }
  async findOne(id: number) {
    const client = await this.clientRepo.findOne({
      where: { id: id },
      include: { all: true },
    });
    if (!client) {
      throw new NotFoundException('Client with such id is not found');
    }
    return client;
  }

  async findOrder(id: number) {
    const client = await this.clientRepo.findAll({
      where: { id: id },
      include: {
        model: Order,
        attributes: ['card_id'],
      },
    });
    if (!client) {
      throw new NotFoundException('Client with such id is not found');
    }
    const totalAmount = await Order.sum('card_id', {
      where: { id },
    });

    // Если totalAmount не определено, вернуть 0
    return totalAmount || 0;
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const client = await this.findOne(id);
    const updClient = await this.clientRepo.update(updateClientDto, {
      where: { id: id },
    });

    return updClient;
  }

  async remove(id: number) {
    const client = await this.findOne(id);
    await client.destroy();

    return { message: 'Successfully removed' };
  }

  async newOtp(phone_number: number) {
    const otp = Number(
      otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      }),
    );

    await this.otpService.sendOtp(phone_number, otp);

    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 5);
    await this.otpRepo.destroy({
      where: { phone_number: `+${phone_number}` },
    });

    const newOtp = await this.otpRepo.create({
      unique_id: uuidv4(),
      otp: otp,
      expiration_time,
      phone_number: `+${phone_number}`,
    });

    const details = {
      timestamp: now,
      phone_number: newOtp.phone_number,
      success: true,
      message: 'OTP sent to client',
      otp_id: newOtp.id,
    };

    const encoded = await encode(JSON.stringify(details));
    return { status: 'Sent', details: encoded };
  }

  async getTokens(client: Client) {
    const jwtPayload = {
      id: client.id,
      phone: client.phone_number,
      is_active: client.is_active,
      role: 'client',
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async makeVerifyTrue(otp_id: string) {
    const verified = await this.otpRepo.update(
      { verified: true },
      {
        where: {
          unique_id: otp_id,
        },
      },
    );
    if (verified) return true;
    throw new BadRequestException('Wrong one time password ...');
  }
}
