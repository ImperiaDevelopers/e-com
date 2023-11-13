import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { SignUpAdminDto } from './dto/signupAdmin.dto';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { SignInAdminDto } from './dto/signinAdmin.dto';
import { UpdateAdminDto } from './dto/updateAdmin.dto';
import { UpdateAdminPassDto } from './dto/update-admin-password.dto';
import { UpdateAdminEmailDto } from './dto/update-admin-email.dto';

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

  //Sign in admin
  async signinAdmin(signInAdminDto: SignInAdminDto, res: Response) {
    const { email, password } = signInAdminDto;
    //Admin is exists?
    const admin = await this.AdminRepo.findOne({ where: { email } });
    if (!admin) {
      throw new UnauthorizedException('Admin has not registered');
    }
    //passwords does not match
    const itMatches = await bcrypt.compare(password, admin.password);
    if (!itMatches) {
      throw new UnauthorizedException('Password is wrong!');
    }

    //Generate new tokens
    const tokens = await this.getTokens(admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updateAdmin = await this.AdminRepo.update(
      { refresh_token: hashed_refresh_token },
      { where: { id: admin.id }, returning: true },
    );

    //Cookie setting
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 10000,
      httpOnly: true,
    });

    //sending response to frontend
    const response = {
      message: 'Admin signin successfully',
      admin: updateAdmin[1][0],
      tokens,
    };
    return response;
  }

  //Sign out admin
  async signoutAdmin(refresh_token: string, res: Response) {
    const adminData = await this.jwtservice.verify(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });

    //Is admin exists?
    if (!adminData) throw new ForbiddenException('Admin not found');
    const updateAdmin = await this.AdminRepo.update(
      { refresh_token: null },
      { where: { id: adminData.id }, returning: true },
    );

    //Clearing cookie
    res.clearCookie('refresh_token');
    const response = {
      message: 'Admin signed out successfully',
      admin: updateAdmin[1][0],
    };
    return response;
  }

  //Refreshtoken admin
  async refreshtoken(admin_id: number, refresh_token: string, res: Response) {
    const decodedToken = this.jwtservice.decode(refresh_token);
    if (admin_id != decodedToken['id']) {
      throw new BadRequestException('You can not do this action');
    }

    const admin = await this.AdminRepo.findOne({
      where: { id: admin_id },
    });
    if (!admin || !admin.refresh_token) {
      throw new BadRequestException('Admin not found');
    }

    const tokenMatch = await bcrypt.compare(refresh_token, admin.refresh_token);
    if (!tokenMatch) throw new ForbiddenException('Forbidden');

    const token = await this.getTokens(admin);
    const hashed_refresh_token = await bcrypt.hash(token.refresh_token, 7);
    const updateAdmin = await this.AdminRepo.update(
      { refresh_token: hashed_refresh_token },
      { where: { id: admin.id }, returning: true },
    );
    res.cookie('refresh_token', token.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: 'Admin refreshsheed',
      admin: updateAdmin[1][0],
      token,
    };
    return response;
  }

  //Get all admins
  async getAllAdmins() {
    const admins = await this.AdminRepo.findAll({});
    if (admins.length) return admins;
    else throw new NotFoundException('Any admin not found');
  }

  //Get admin by id
  async getAdminById(id: number) {
    const admin = await this.AdminRepo.findByPk(id);
    if (admin) return admin;
    else throw new NotFoundException('Admin not found at this id');
  }

  //Update admin by id
  async updateAdminInfo(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.AdminRepo.findByPk(id);
    if (admin) {
      const updating = await this.AdminRepo.update(updateAdminDto, {
        where: { id },
        returning: true,
      });
      return updating[1][0].dataValues;
    }
    throw new BadRequestException('Admin not found or something is wrong');
  }

  //Update admin password
  async updateAdminPassword(
    id: number,
    updaetAdminPassDto: UpdateAdminPassDto,
  ) {
    const admin = await this.AdminRepo.findOne({ where: { id: id } });
    const isRight = await bcrypt.compare(
      updaetAdminPassDto.old_password,
      admin.password,
    );
    if (!isRight) throw new BadRequestException('Old password is not correct');
    if (
      updaetAdminPassDto.new_password !==
      updaetAdminPassDto.confirm_new_password
    ) {
      throw new BadRequestException('Passwords doest match');
    }
    const hashed_password = await bcrypt.hash(
      updaetAdminPassDto.new_password,
      7,
    );
    const updating = await this.AdminRepo.update(
      { password: hashed_password },
      { where: { id }, returning: true },
    );
    if (updating[1][0]) return updating[1][0].dataValues;
    else throw new BadRequestException('Something is wrong');
  }

  //Update admin email
  async updateAdminEmailById(
    id: number,
    updateAdmimEmailDto: UpdateAdminEmailDto,
  ) {
    const updating = await this.AdminRepo.update(
      { email: updateAdmimEmailDto.new_email, is_active: false },
      { where: { id }, returning: true },
    );
    try {
      await this.mailService.sendAdminConfrmation(updating[1][0].dataValues);
    } catch (error) {
      console.log(error);
    }
    return updating[1][0].dataValues;
  }

  //Delete admin by id
  async deleteAdminById(id: number) {
    const deleting = await this.AdminRepo.destroy({ where: { id } });
    if (deleting) return 'Admin deleted successfully';
    else throw new NotFoundException('Admin not found at this id or smt wrong');
  }
}
