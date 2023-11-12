import { Injectable } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Payment } from "./models/payment.model";

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment) private readonly PaymentRepo: typeof Payment
  ) {}
  async create(createPaymentDto: CreatePaymentDto) {
    return await this.PaymentRepo.create(createPaymentDto);
  }

  async findAll() {
    return await this.PaymentRepo.findAll();
  }

  async findOne(id: number) {
    return await this.PaymentRepo.findByPk(id);
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return await this.PaymentRepo.update(updatePaymentDto, { where: { id } });
  }

  async remove(id: number) {
    return await this.PaymentRepo.destroy({ where: { id } });
  }
}
