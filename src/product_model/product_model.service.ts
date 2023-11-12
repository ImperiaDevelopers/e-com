import { Injectable } from '@nestjs/common';
import { CreateProductModelDto } from './dto/create-product_model.dto';
import { UpdateProductModelDto } from './dto/update-product_model.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ProductModel } from './models/product_model.model';

@Injectable()
export class ProductModelService {
  constructor(
    @InjectModel(ProductModel)
    private product_modelRepository: typeof ProductModel,
  ) {}

  async create(
    createProductModelDto: CreateProductModelDto,
  ): Promise<ProductModel> {
    const newProductModel = await this.product_modelRepository.create(
      createProductModelDto,
    );
    return newProductModel;
  }

  async findAll(): Promise<ProductModel[]> {
    const product_models = await this.product_modelRepository.findAll({
      include: { all: true },
    });
    return product_models;
  }

  async findOne(id: number): Promise<ProductModel> {
    const product_model = await this.product_modelRepository.findOne({
      where: { id },
      include: { all: true },
    });
    return product_model;
  }

  async update(id: number, updateProductModelDto: UpdateProductModelDto) {
    const updatedProductModel = await this.product_modelRepository.update(
      updateProductModelDto,
      {
        where: { id },
        returning: true,
      },
    );
    return updatedProductModel[1][0].dataValues;
  }

  async remove(id: number) {
    const removedProductModel = await this.product_modelRepository.destroy({
      where: { id },
    });
    return removedProductModel;
  }
}
