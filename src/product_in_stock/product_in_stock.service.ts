import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductInStockDto } from './dto/create-product_in_stock.dto';
import { UpdateProductInStockDto } from './dto/update-product_in_stock.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ProductInStock } from './models/product_in_stock.model';
import { Product } from '../product/models/product.model';
import { Sale } from '../sale/models/sale.model';

@Injectable()
export class ProductInStockService {
  constructor(
    @InjectModel(ProductInStock)
    private productInStockRepository: typeof ProductInStock,
    @InjectModel(Sale)
    private saleRepository: typeof Sale,
    @InjectModel(Product)
    private productRepository: typeof Product,
  ) {}

  async create(
    createProductInStockDto: CreateProductInStockDto,
  ): Promise<ProductInStock> {
    const newProductInStock = await this.productInStockRepository.create(
      createProductInStockDto,
    );

    // Check if there is an active sale for the product
    const activeSale = await this.saleRepository.findOne({
      where: {
        from: { $lte: new Date() },
        to: { $gte: new Date() },
        // productId: createProductInStockDto.productId,
      },
    });

    if (activeSale) {
      // Apply discount to the product price based on the sale percentage
      const product = await this.productRepository.findByPk(
        // createProductInStockDto.productId,
      );

      if (product) {
        const discountedPrice =
          product.price - (product.price * activeSale.percent) / 100;

        // Update the product in stock with the discounted price
        await this.productRepository.update(
          { price: discountedPrice },
          { where: { id: newProductInStock.id } },
        );
      }
    }

    return newProductInStock;
  }
  async findAll(): Promise<ProductInStock[]> {
    const product_in_stocks = await this.productInStockRepository.findAll({
      include: { all: true },
    });
    return product_in_stocks;
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
