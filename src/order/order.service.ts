import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './models/order.model';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order) private OrderRepo: typeof Order) {}

  //Create order
  async createOrder(createOrderDto: CreateOrderDto) {
    const newOrder = await this.OrderRepo.create({
      ...createOrderDto,
    });
    const response = {
      message: 'Order successfully created',
      category: newOrder,
    };
    return response;
  }

  //Get all orders
  async getAllOrders() {
    const orders = await this.OrderRepo.findAll({ include: { all: true } });
    if (orders.length) return orders;
    throw new NotFoundException('Any order not found or smt is wrong');
  }

  //Get order by id
  async getOrderById(id: number) {
    const order = await this.OrderRepo.findOne({
      where: { id: id },
      include: { all: true },
    });
    if (order) return order;
    throw new NotFoundException('Order not found at this id or smt is wrong');
  }

  //Get order by  client id
  async getOrderByClientId(id: number) {
    const order = await this.OrderRepo.findAll({
      where: { client_id: id },
      include: { all: true },
    });
    if (order) return order;
    throw new NotFoundException('Order not found at this id or smt is wrong');
  }

  //Update order by id
  async updateOrderById(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.OrderRepo.findOne({ where: { id: id } });
    if (order) {
      const updating = await this.OrderRepo.update(updateOrderDto, {
        where: { id: id },
        returning: true,
      });
      return updating;
    }
    throw new NotFoundException('Order not found at this id or smt is wrong');
  }

  //Delete order by id
  async deleteOrderById(id: number) {
    const order = await this.OrderRepo.findByPk(id);
    if (order) {
      const deleting = await this.OrderRepo.destroy({ where: { id: id } });
      return deleting;
    }
    throw new NotFoundException('Order not found at this id or smt is wrong');
  }
}
