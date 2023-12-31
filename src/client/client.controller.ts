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

  @Post('create_client')
  @ApiOperation({ summary: 'create client' })
  @ApiResponse({ status: 200, description: 'Profile created' })
  setClientNames(@Body() createClientDto: CreateClientDto) {
    const response = this.clientService.createClient(createClientDto);
    return response;
  }

  @Get('main/:clientId')
  async getMainStatistics(@Param('clientId') clientId: number) {
    return this.clientService.findOrder(clientId);
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

  @Post('send-order')
  @ApiOperation({ summary: 'Send message to client about order' })
  @ApiResponse({ status: 200, description: 'OTP sent seccessfully' })
  messageOrder(@Body() phoneNumberDto: PhoneNumberDto) {
    return this.clientService.messageOrder(phoneNumberDto?.phone_number);
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
