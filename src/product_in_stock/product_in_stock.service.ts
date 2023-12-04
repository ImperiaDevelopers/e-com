import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductInStockDto } from './dto/create-product_in_stock.dto';
import { UpdateProductInStockDto } from './dto/update-product_in_stock.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ProductInStock } from './models/product_in_stock.model';
import { Product } from '../product/models/product.model';
import { Image } from '../image/model/image.model';

let price = Number();

@Injectable()
export class ProductInStockService {
  constructor(
    @InjectModel(ProductInStock)
    private productInStockRepository: typeof ProductInStock,

    @InjectModel(Product)
    private productRepository: typeof Product,
  ) {}

  async create(createProductInStockDto: CreateProductInStockDto): Promise<any> {
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
      new Date(newProductInStock.from).getTime() + durationInMilliseconds,
    );
    await this.productRepository.update(
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
      { where: { product_id: product.id } },
    );
    const updateProduct = await this.productInStockRepository.findOne({
      where: { product_id: product.id },
    });
    return updateProduct;
  }

  async findAll(): Promise<ProductInStock[]> {
    const productInStocks = await this.productInStockRepository.findAll({
      include: [
        {
          model: Product,
          include: [{ model: Image }],
        },
      ],
    });

    const currentDate = new Date();
    let count = 0;

    for (const productInStock of productInStocks) {
      if (new Date(productInStock.to) < currentDate) {
        const productFromStock = await this.productRepository.findOne({
          where: { id: productInStock.product_id },
        });
        if (count == 0) {
          const price =
            productFromStock.price / (1 - productInStock.percent / 100);
          console.log(price);

          await this.productRepository.update(
            { price: price },
            { where: { id: productInStock.product_id } },
          );

          await this.productInStockRepository.destroy({
            where: { id: productInStock.id },
          });
        }
        count++;
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
