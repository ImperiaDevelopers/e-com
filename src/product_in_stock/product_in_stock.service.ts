import { Injectable } from '@nestjs/common';
import { CreateProductInStockDto } from './dto/create-product_in_stock.dto';
import { UpdateProductInStockDto } from './dto/update-product_in_stock.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ProductInStock } from './models/product_in_stock.model';

@Injectable()
export class ProductInStockService {
  constructor(
    @InjectModel(ProductInStock)
    private product_in_stockRepository: typeof ProductInStock,
  ) {}

  async create(
    createProductInStockDto: CreateProductInStockDto,
  ): Promise<ProductInStock> {
    const newProductInStock = await this.product_in_stockRepository.create(
      createProductInStockDto,
    );
    return newProductInStock;
  }

  async findAll(): Promise<ProductInStock[]> {
    const product_in_stocks = await this.product_in_stockRepository.findAll({
      include: { all: true },
    });
    return product_in_stocks;
  }

  async findOne(id: number): Promise<ProductInStock> {
    const product_in_stock = await this.product_in_stockRepository.findOne({
      where: { id },
      include: { all: true },
    });
    return product_in_stock;
  }

  async update(id: number, updateProductInStockDto: UpdateProductInStockDto) {
    const updatedProductInStock = await this.product_in_stockRepository.update(
      updateProductInStockDto,
      {
        where: { id },
        returning: true,
      },
    );
    return updatedProductInStock[1][0].dataValues;
  }

  async remove(id: number) {
    const removedProductInStock = await this.product_in_stockRepository.destroy(
      {
        where: { id },
      },
    );
    return removedProductInStock;
  }
}
