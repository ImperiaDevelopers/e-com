import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { SignUpAdminDto } from './dto/signupAdmin.dto';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin) private AdminRepo: typeof Admin,
    private readonly jwtservice: JwtService,
    private readonly mailService: MailService,
  ) {}

  //signup admin
  async signupAdmin(signUpAdminDto: SignUpAdminDto, res: Response) {
    const admin = await this.AdminRepo.findOne({
      where: { email: signUpAdminDto.email },
    });
    if (admin) throw new BadRequestException('Admin already exists');

    if (signUpAdminDto.password != signUpAdminDto.confirm_password) {
      throw new BadRequestException('Passwords does not match');
    }

    const hashed_password = await bcrypt.hash(signUpAdminDto.password, 7);
    const newAdmin = await this.AdminRepo.create({
      ...signUpAdminDto,
      password: hashed_password,
    });

    const tokens = await this.getTokens(newAdmin);

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const uniqueKey: string = uuidv4();
    const updateAdmin = await this.AdminRepo.update(
      { refresh_token: hashed_refresh_token, unique_id: uniqueKey },
      {
        where: { id: newAdmin.id },
        returning: true,
      },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    const response = {
      message: 'Admin signed up successfully',
      admin: updateAdmin[1][0],
      tokens,
    };

    try {
      console.log(updateAdmin[1][0]);
      await this.mailService.sendAdminConfrmation(updateAdmin[1][0]);
    } catch (error) {
      console.log(error);
    }

    return response;
  }

  //Token generatsiya qilish
  async getTokens(admin: Admin) {
    const JwtPayload = {
      id: admin.id,
      is_active: admin.is_active,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtservice.signAsync(JwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtservice.signAsync(JwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  //Activate admin
  async activateAdmin(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link not found');
    }
    const updateAdmin = await this.AdminRepo.update(
      { is_active: true },
      { where: { unique_id: link, is_active: false }, returning: true },
    );
    if (!updateAdmin[1][0]) {
      throw new BadRequestException('Admin already activated');
    }
    const response = {
      message: 'Admin successfully updated',
      worker: updateAdmin,
    };
    return response;
  }
}
