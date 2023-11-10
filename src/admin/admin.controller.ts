import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignUpAdminDto } from './dto/signupAdmin.dto';
import { Response } from 'express';

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
  @ApiOperation({ summary: 'Activate admin' })
  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.adminService.activateAdmin(link);
  }
}
