import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { FindBySortDto } from './dto/findBySort.dto';
import { Op, literal } from 'sequelize';
import { ProInfo } from '../pro_info/models/pro_info.model';
import { Category } from '../category/models/category.model';
import { Comment } from '../comment/models/comment.model';
import { FindAllDto } from './dto/findAll.dto';
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

  async searchPro(findAllDto: FindAllDto): Promise<Product[]> {
    try {
      const client = await this.productRepository.findAll({
        include: { all: true },
        where: {
          name: {
            [Op.like]: `%${findAllDto.name}%`,
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

  // async getAverageRating() {
  //   try {
  //     let filter = {};
  //     const products = await this.productRepository.findAll({
  //       where: filter,
  //       include: [{ model: Comment, where: { rating: { [Op.lte]: 5 } } }],
  //     });
  //     return products;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  async getAverageRating() {
    try {
      const products = await this.productRepository.findAll({
        include: [{ model: Comment, attributes: ['rating'] }],
      });

      let totalRating = 0;
      let totalComments = 0;

      products.forEach((product) => {
        product.Comments.forEach((comment) => {
          totalRating += comment.rating;
          totalComments++;
        });
      });

      const averageRating = totalComments > 0 ? totalRating / totalComments : 0;

      console.log('Средний рейтинг продуктов:', averageRating);
    } catch (err) {
      console.error(err);
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
  // async findBySort(findBySortDto: FindBySortDto): Promise<Product[]> {
  //   const whereClause: any = {};

  //   if (findBySortDto.from !== undefined && findBySortDto.to !== undefined) {
  //     whereClause.price = {
  //       [Op.gte]: findBySortDto.from,
  //       [Op.lte]: findBySortDto.to,
  //     };
  //   }

  //   if (findBySortDto.brend !== undefined) {
  //     whereClause.product_brand = { name: findBySortDto.bnewToDaterend };
  //   }

  //   if (findBySortDto.ram !== undefined) {
  //     whereClause.pro_info = { performers_value: findBySortDto.ram };
  //   }

  //   if (findBySortDto.acc !== undefined) {
  //     whereClause.$pro_info$ = { performers_value: findBySortDto.acc };
  //   }

  //   if (Object.keys(whereClause).length === 0) {
  //     return await this.productRepository.findAll({ include: { all: true } });
  //   }

  //   const products = await this.productRepository.findAll({
  //     include: { all: true },
  //     where: whereClause,
  //   });

  //   return products;
  // }

  async findBySort(
    filterProductDto: FindBySortDto,
    page: number,
    limit: number,
  ) {
    try {
      let limit_2: number;
      let page_2: number;
      page_2 = +page > 1 ? +page : 1;
      limit_2 = +limit > 0 ? +limit : null;
      const { attributes } = filterProductDto;
      let filter: any = {};
      if (filterProductDto.brend) {
        filter.product_brand_id = filterProductDto.brend;
      }
      if (Object.entries(filterProductDto.price).length > 0) {
        filter.price = {
          [Op.gte]: filterProductDto.price.from,
          [Op.lt]: filterProductDto.price.to,
        };
      }
      if (filterProductDto.category) {
        filter.category_id = filterProductDto.category;
      }
      let products: Product[];
      if (attributes.length > 0) {
        const attributesConditions = filterProductDto.attributes.map(
          (attribute) => ({
            id: { [Op.eq]: attribute.attribute_id },
            performers_value: { [Op.eq]: attribute.attribute_value },
          }),
        );
        products = await this.productRepository.findAll({
          where: { ...filter, $productInStock$: { [Op.is]: null } },
          include: [
            {
              model: ProInfo,
              where: {
                [Op.or]: attributesConditions,
              },
            },
          ],
        });
        products = products.filter(
          (product) =>
            product?.dataValues?.pro_info?.length == attributes?.length,
        );
      } else {
        products = await this.productRepository.findAll({
          where: { ...filter, $productInStock$: { [Op.is]: null } },
          include: {
            all: true,
          },

          offset: (page_2 - 1) * limit_2,
          limit: limit_2,
        });
      }
      return products;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
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
