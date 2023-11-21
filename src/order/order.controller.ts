import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateOrderDto } from './dto/update-order.dto';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  //Create order
  @ApiResponse({ status: 201, description: 'Order successfully created' })
  @ApiResponse({ status: 400, description: 'Something wrong' })
  @ApiOperation({ summary: 'Create order' })
  @Post('create')
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  //Get all orders
  @ApiResponse({ status: 200, description: 'All orders are here' })
  @ApiResponse({
    status: 400,
    description: 'Orders not found or something is wrong',
  })
  @ApiOperation({ summary: 'Get all orders' })
  @Get('all')
  async getAllOrder() {
    return this.orderService.getAllOrders();
  }

  //Get  order by id
  @ApiResponse({ status: 200, description: 'Order is here' })
  @ApiResponse({
    status: 400,
    description: 'Order not found or something is wrong',
  })
  @ApiOperation({ summary: 'Get order by id' })
  @Get('/:id')
  async getOrderById(@Param('id') id: number) {
    return this.orderService.getOrderById(id);
  }

  //Update  order by id
  @ApiResponse({ status: 200, description: 'Order is successfully updated' })
  @ApiResponse({
    status: 400,
    description: 'Order not found or something is wrong',
  })
  @ApiOperation({ summary: 'Update order by id' })
  @Put('update/:id')
  async updateOrderById(
    @Param('id') id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.updateOrderById(id, updateOrderDto);
  }

  //Delete  order by id
  @ApiResponse({ status: 200, description: 'Order is successfully deleted' })
  @ApiResponse({
    status: 400,
    description: 'Order not found or something is wrong',
  })
  @ApiOperation({ summary: 'Delete order by id' })
  @Delete('delete/:id')
  async deleteOrderById(@Param('id') id: number) {
    return this.orderService.deleteOrderById(id);
  }
}
