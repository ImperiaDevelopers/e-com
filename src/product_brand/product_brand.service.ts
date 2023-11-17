import { Injectable } from '@nestjs/common';
import { CreateProductBrandDto } from './dto/create-product_brand.dto';
import { UpdateProductBrandDto } from './dto/update-product_brand.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ProductBrand } from './models/product_brand.model';

@Injectable()
export class ProductBrandService {
  constructor(
    @InjectModel(ProductBrand)
    private productbrandRepository: typeof ProductBrand,
  ) {}

  async create(
    createProductBrandDto: CreateProductBrandDto,
  ): Promise<ProductBrand> {
    const newProductBrand = await this.productbrandRepository.create(
      createProductBrandDto,
    );
    return newProductBrand;
  }

  async findAll(): Promise<ProductBrand[]> {
    const product_brands = await this.productbrandRepository.findAll({
      include: { all: true },
    });
    return product_brands;
  }

  async findOne(id: number): Promise<ProductBrand> {
    const product_brand = await this.productbrandRepository.findOne({
      where: { id },
      include: { all: true },
    });
    return product_brand;
  }

  async findbrandCat(id: number) {
    const proCat = await this.productbrandRepository.findAll({
      include: {all: true},
      where: {
        pro_cat_brand: {
          pro_brend_id: id
        }
      }
    });
    return proCat
  }

  async update(id: number, updateProductBrandDto: UpdateProductBrandDto) {
    const updatedProductBrand = await this.productbrandRepository.update(
      updateProductBrandDto,
      {
        where: { id },
        returning: true,
      },
    );
    return updatedProductBrand[1][0].dataValues;
  }

  async remove(id: number) {
    const removedProductBrand = await this.productbrandRepository.destroy({
      where: { id },
    });
    return removedProductBrand;
  }
}
