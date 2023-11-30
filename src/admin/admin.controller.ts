import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignUpAdminDto } from './dto/signupAdmin.dto';
import { Response } from 'express';
import { SignInAdminDto } from './dto/signinAdmin.dto';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { Admin } from './models/admin.model';
import { UpdateAdminDto } from './dto/updateAdmin.dto';
import { UpdateAdminPassDto } from './dto/update-admin-password.dto';
import { UpdateAdminEmailDto } from './dto/update-admin-email.dto';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  //SignUpAdmin
  @ApiOperation({ summary: 'SignUp admin' })
  @ApiResponse({ status: 201, description: 'Admin successfully created' })
  @ApiResponse({ status: 400, description: 'Something wrong' })
  @Post('signup')
  async signUp(
    @Body() signUpAdminDto: SignUpAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.signupAdmin(signUpAdminDto, res);
  }

  //Activate admin
  @ApiResponse({ status: 200, description: 'Admin successfully activated' })
  @ApiResponse({ status: 400, description: 'Something is wrong' })
  @ApiOperation({ summary: 'Activate admin' })
  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.adminService.activateAdmin(link);
  }

  //Signin admin
  @ApiResponse({ status: 200, description: 'Admin successfully signined up' })
  @ApiResponse({ status: 401, description: 'Email or password is wrong' })
  @ApiOperation({ summary: 'Sigin admin' })
  @Post('signin')
  async signin(
    @Body() signInAdminDto: SignInAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.signinAdmin(signInAdminDto, res);
  }

  //SignOut admin
  @ApiResponse({ status: 201, description: 'Admin successfully signed out' })
  @ApiResponse({ status: 401, description: 'Token is not found or smt wrong' })
  @ApiOperation({ summary: 'Signout admin' })
  @Post('signout')
  async signOut(
    @CookieGetter('refresh_token') refresh_token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.signoutAdmin(refresh_token, res);
  }

  //RefreshToken Admin
  @ApiResponse({ status: 201, description: 'Admin successfully refreshed' })
  @ApiResponse({ status: 401, description: 'Token is not found or smt wrong' })
  @ApiOperation({ summary: 'Refresh token' })
  @Post(':id/refresh')
  async refresh(
    @Param('id') id: string,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminService.refreshtoken(+id, refreshToken, res);
  }

  //Get all admins
  @ApiResponse({ status: 200, description: 'All admins are here' })
  @ApiResponse({ status: 401, description: 'Something is wrong' })
  @ApiOperation({ summary: 'Get all admins' })
  @Get('all')
  async getAllAdmin(): Promise<Admin[]> {
    return this.adminService.getAllAdmins();
  }

  //Get admin by id
  @ApiResponse({ status: 200, description: 'Admin is are here' })
  @ApiResponse({
    status: 404,
    description: 'Admin not found at this id or something is wrong',
  })
  @ApiOperation({ summary: 'Get admin by id' })
  @Get(':id')
  async getAdminById(@Param('id') id: number): Promise<Admin | any> {
    return this.adminService.getAdminById(id);
  }

  //Update admin by id
  @ApiResponse({ status: 200, description: 'Admin successfully updated' })
  @ApiResponse({ status: 400, description: 'Admin not found or smt wrong' })
  @ApiOperation({ summary: 'Update admin info' })
  @Put('update/:id')
  async updateAdminInfo(
    @Param('id') id: number,
    @Body() updateAdminDto: UpdateAdminDto,
  ): Promise<Admin> {
    return this.adminService.updateAdminInfo(id, updateAdminDto);
  }

  //Update Admin password by id
  @ApiResponse({
    status: 200,
    description: 'Admin password successfully updated',
  })
  @ApiResponse({ status: 400, description: 'Something is wrong' })
  @ApiOperation({ summary: 'Update admin password' })
  @Put('password/:id')
  async updateAdminPassword(
    @Param('id') id: number,
    @Body() updateAdminPassDto: UpdateAdminPassDto,
  ): Promise<Admin> {
    return this.adminService.updateAdminPassword(id, updateAdminPassDto);
  }

  //update admin email by id
  @ApiResponse({ status: 200, description: 'Admin email successfully updated' })
  @ApiResponse({ status: 400, description: 'Something is wrong' })
  @ApiOperation({ summary: 'Update admin email' })
  @Put('email/:id')
  async updateAdminEmail(
    @Param('id') id: number,
    @Body() updateAdminEmailDto: UpdateAdminEmailDto,
  ): Promise<Admin> {
    return this.adminService.updateAdminEmailById(id, updateAdminEmailDto);
  }

  //Delete admin by id
  @ApiResponse({ status: 200, description: 'Admin email successfully deleted' })
  @ApiResponse({ status: 404, description: 'Admin not found or smt wrong' })
  @ApiOperation({ summary: 'Delete admin' })
  @Delete('delete/:id')
  async deleteAdmin(@Param('id') id: number): Promise<string> {
    return this.adminService.deleteAdminById(id);
  }
}
