import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Query,
  Put,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { PhoneNumberDto } from './dto/phone-for-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@ApiTags('Client')
@Controller('client')
@ApiTags('Client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('set-profile')
  @ApiOperation({ summary: 'Set client names' })
  @ApiResponse({ status: 200, description: 'Profile set successfully' })
  setClientNames(
    @Body() createClientDto: CreateClientDto,
    @Res() res: Response,
  ) {
    const response = this.clientService.setClientName(createClientDto, res);
    return response;
  }

  @Get('all')
  @ApiOperation({ summary: 'Get a list of all client' })
  @ApiResponse({
    status: 200,
    description: 'List of client retrieved successfully',
  })
  findAll(@Query() params: { page: number; limit: number }): any {
    return this.clientService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update client by ID' })
  @ApiResponse({ status: 200, description: 'Client updated successfully' })
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto);
  }

  @Post('send-otp')
  @ApiOperation({ summary: 'Sign in with OTP' })
  @ApiResponse({ status: 200, description: 'OTP sent seccessfully' })
  signInWithOtp(@Body() phoneNumberDto: PhoneNumberDto) {
    return this.clientService.signInWithOtp(phoneNumberDto?.phone_number);
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'Verify OTP' })
  @ApiResponse({ status: 200, description: 'OTP verified successfully' })
  verifyOtp(
    @Body() verifyOtpDto: VerifyOtpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.clientService.verifyOtpClient(verifyOtpDto, res);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete client by ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}
