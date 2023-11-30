import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductInStockDto } from './dto/create-product_in_stock.dto';
import { UpdateProductInStockDto } from './dto/update-product_in_stock.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ProductInStock } from './models/product_in_stock.model';
import { Product } from '../product/models/product.model';

let price = Number();

@Injectable()
export class ProductInStockService {
  constructor(
    @InjectModel(ProductInStock)
    private productInStockRepository: typeof ProductInStock,

    @InjectModel(Product)
    private productRepository: typeof Product,
  ) {}

  async create(
    createProductInStockDto: CreateProductInStockDto,
  ): Promise<ProductInStock> {
    const product = await this.productRepository.findByPk(
      createProductInStockDto.product_id,
    );
    price = product.price;
    const newProductInStock = await this.productInStockRepository.create(
      createProductInStockDto,
    );
    const durationInMilliseconds =
      createProductInStockDto.duration * 24 * 60 * 60 * 1000;

    const newToDate = new Date(
      new Date(createProductInStockDto.from).getTime() + durationInMilliseconds,
    );
    const productPrice = await this.productRepository.update(
      {
        price:
          product.price -
          (product.price * createProductInStockDto.percent) / 100,
      },
      { where: { id: product.id } },
    );
    await this.productInStockRepository.update(
      {
        to: String(newToDate),
      },
      { where: { id: createProductInStockDto.product_id } },
    );
    return newProductInStock;
  }

  async findAll(): Promise<ProductInStock[]> {
    const productInStocks = await this.productInStockRepository.findAll({
      include: { all: true },
    });

    const currentDate = new Date();

    for (const productInStock of productInStocks) {
      if (new Date(productInStock.to) < currentDate) {
        const productFromStock = await this.productRepository.findOne({
          where: { id: productInStock.product_id },
        });

        const price =
          productFromStock.price / (1 - productInStock.percent / 100);
        await this.productRepository.update(
          { price: price },
          { where: { id: productInStock.product_id } },
        );

        await this.productInStockRepository.destroy({
          where: { id: productInStock.id },
        });
      }
    }

    return productInStocks;
  }

  async findOne(id: number): Promise<ProductInStock> {
    const product_in_stock = await this.productInStockRepository.findOne({
      where: { id },
      include: { all: true },
    });
    return product_in_stock;
  }

  async update(id: number, updateProductInStockDto: UpdateProductInStockDto) {
    const updatedProductInStock = await this.productInStockRepository.update(
      updateProductInStockDto,
      {
        where: { id },
        returning: true,
      },
    );
    return updatedProductInStock[1][0].dataValues;
  }

  async remove(id: number) {
    const removedProductInStock = await this.productInStockRepository.destroy({
      where: { id },
    });
    return removedProductInStock;
  }
}
