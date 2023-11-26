import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { FindBySortDto } from './dto/findBySort.dto';
import { Op } from 'sequelize';

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

  async searchPro(createProductDto: CreateProductDto) {
    try {
      const client = await this.productRepository.findAll({
        include: { all: true },
        where: {
          name: {
            [Op.iLike]: `%${createProductDto.name}%`,
          },
        },
      });
      return client;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(page: number, limit: number) {
    try {
      let limit_1: number;
      let page_1: number;
      page_1 = +page > 1 ? +page : 1;
      limit_1 = +limit > 0 ? +limit : null;

      const products = await this.productRepository.findAll({
        include: { all: true },
        offset: (page_1 - 1) * limit_1,
        limit: limit_1,
      });
      return products;
    } catch (error) {
      throw new BadGatewayException('Неверный запрос от клиента');
    }
  }

  // async findBySort(findBySortDto: FindBySortDto): Promise<Product[]> {
  //   const products = await this.productRepository.findAll({
  //     include: { all: true },
  //     where: {
  //       price: {
  //         [Op.gte]: findBySortDto.from,
  //         [Op.lte]: findBySortDto.to,
  //       },
  //       product_brand: {
  //         name: findBySortDto.brend,
  //       },
  //       pro_info: {
  //         performers_value: findBySortDto.ram,
  //       },
  //       $pro_info$: {
  //         performers_value: findBySortDto.acc,
  //       },
  //     },
  //   });
  //   return products;
  // }
  async findBySort(findBySortDto: FindBySortDto): Promise<Product[]> {
    const whereClause: any = {};

    if (findBySortDto.from !== undefined && findBySortDto.to !== undefined) {
      whereClause.price = {
        [Op.gte]: findBySortDto.from,
        [Op.lte]: findBySortDto.to,
      };
    }

    if (findBySortDto.brend !== undefined) {
      whereClause.product_brand = { name: findBySortDto.brend };
    }

    if (findBySortDto.ram !== undefined) {
      whereClause.pro_info = { performers_value: findBySortDto.ram };
    }

    if (findBySortDto.acc !== undefined) {
      whereClause.$pro_info$ = { performers_value: findBySortDto.acc };
    }

    if (Object.keys(whereClause).length === 0) {
      return await this.productRepository.findAll({ include: { all: true } });
    }

    const products = await this.productRepository.findAll({
      include: { all: true },
      where: whereClause,
    });

    return products;
  }

  // async findBySort(filterProductDto: FindBySortDto) {
  //   try {
  //     let filter: any = {};
  //     if (filterProductDto.brand_id) {
  //       filter.brand_id = filterProductDto.brand_id;
  //     }
  //     if (Object.entries(filterProductDto.price).length > 0) {
  //       filter.price = {
  //         [Op.gte]: filterProductDto.price.from,
  //         [Op.lt]: filterProductDto.price.to,
  //       };
  //     }
  //     let products: Product[];
  //     if (filterProductDto.attributes.length > 0) {
  //       const attributesConditions = filterProductDto.attributes.map(
  //         (attribute) => ({
  //           attribute_id: { [Op.eq]: attribute.attribute_id },
  //           attribute_value: { [Op.eq]: attribute.attribute_value },
  //         }),
  //       );
  //       products = await this.productRepo.findAll({
  //         where: filter,
  //         include: [
  //           {
  //             model: ProductInfo,
  //             where: {
  //               [Op.or]: attributesConditions,
  //             },
  //           },
  //         ],
  //       });
  //     } else {
  //       products = await this.productRepo.findAll({ where: filter });
  //     }
  //     return products;
  //   } catch (error) {
  //     throw new BadRequestException(error.message);
  //   }
  // }

  async categoryPro(id: number): Promise<Product[]> {
    const catPro = await this.productRepository.findAll({
      include: { all: true },
      where: {
        category_id: id,
      },
    });
    return catPro;
  }

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
