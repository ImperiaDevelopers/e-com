import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { FindBySortDto } from './dto/findBySort.dto';
import { Op } from "sequelize"

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

  async findBySort(findBySortDto:FindBySortDto): Promise<Product[]> {
    const products = await this.productRepository.findAll({
      include:{all: true},
      where:{
        price:{
          [Op.gte]: findBySortDto.from,
          [Op.lte]: findBySortDto.to
        },
        product_brand: {
          name: findBySortDto.brend
        },
        pro_info: {
          performers_value: findBySortDto.ram
        },
        $pro_info$:{
          performers_value: findBySortDto.acc
        }
      }
    });
    return products;
  }

  async categoryPro(id: number): Promise<Product[]>{
    const catPro = await this.productRepository.findAll({
      include: {all: true},
      where: {
        category_id: id
      }
    }) 
    return catPro
  }
xxxxxxx

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      include: { all: true },
    });
    return product;
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
