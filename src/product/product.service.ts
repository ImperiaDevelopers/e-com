import { Injectable, Optional } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { Op } from 'sequelize';
import { ProductByPrice } from './dto/productPrice.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private productRepository: typeof Product,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = await this.productRepository.create(createProductDto);
    return newProduct;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.findAll({
      include: { all: true },
    });
    return products;
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      include: { all: true },
    });
    return product;
  }

  async getProductByPrice(getProductPrice: ProductByPrice) {
    const priceProduct = await this.productRepository.findAll({
      where: {
        price: {
          [Op.gte]: getProductPrice.from,
          [Op.lt]: getProductPrice.to,
        },
      },
    });
    return priceProduct;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.productRepository.update(
      updateProductDto,
      {
        where: { id },
        returning: true,
      },
    );
    return updatedProduct[1][0].dataValues;
  }

  async remove(id: number) {
    const removedProduct = await this.productRepository.destroy({
      where: { id },
    });
    return removedProduct;
  }
}
