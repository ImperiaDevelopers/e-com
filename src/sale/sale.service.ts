import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Sale } from './models/sale.model';

@Injectable()
export class SaleService {
  constructor(
    @InjectModel(Sale)
    private saleRepository: typeof Sale,
  ) {}

  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    const newSale = await this.saleRepository.create(createSaleDto);
    return newSale;
  }

  async findAll(): Promise<Sale[]> {
    const sales = await this.saleRepository.findAll({
      include: { all: true },
    });
    return sales;
  }

  async findOne(id: number): Promise<Sale> {
    const sale = await this.saleRepository.findOne({
      where: { id },
      include: { all: true },
    });
    return sale;
  } 

 

  async update(id: number, updateSaleDto: UpdateSaleDto) {
    const updatedSale = await this.saleRepository.update(updateSaleDto, {
      where: { id },
      returning: true,
    });
    return updatedSale[1][0].dataValues;
  }

  async remove(id: number) {
    const removedSale = await this.saleRepository.destroy({
      where: { id },
    });
    return removedSale;
  }
}
