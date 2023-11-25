import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Payment } from './models/payment.model';

@Controller('payment')
@ApiTags('Payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @ApiOperation({ summary: 'Create Payment type' })
  @ApiResponse({ status: 201, type: Payment })
  @Post('add')
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @ApiOperation({ summary: 'Get Payment type' })
  @ApiResponse({ status: 201, type: Payment })
  @Get('all')
  findAll() {
    return this.paymentService.findAll();
  }

  @ApiOperation({ summary: 'Get Payment type By Id' })
  @ApiResponse({ status: 201, type: Payment })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update Payment type' })
  @ApiResponse({ status: 201, type: Payment })
  @Put('update/:id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @ApiOperation({ summary: 'Delete Payment type' })
  @ApiResponse({ status: 201, type: Payment })
  @Delete('delstroy/:id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
