import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models/category.model';
import { Op } from 'sequelize';
import { uploadFile } from '../units/file-upload';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private readonly categoryRepo: typeof Category,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepo.create(createCategoryDto);
  }

  async searchCat(createCategoryDto: CreateCategoryDto) {
    try {
      const client = await this.categoryRepo.findAll({
        include: { all: true },
        where: {
          category_name: {
            [Op.iLike]: `%${createCategoryDto.category_name}%`,
          },
        },
      });
      return client;
    } catch (error) {
      console.log(error);
    }
  }

  async uploadImage(image: any) {
    try {
      const filename = await uploadFile(image);
      return { image: filename };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    return await this.categoryRepo.findAll({ include: { all: true } });
  }

  async findOnlyParCats() {
    return await this.categoryRepo.findAll({
      where: { parent_category_id: { [Op.not]: null } },
      include: { all: true },
    });
  }

  async findOne(id: number) {
    await this.categoryRepo.findOne({
      where: { id: id },
      include: { all: true },
    });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryRepo.update(updateCategoryDto, { where: { id } });
  }

  async remove(id: number) {
    return await this.categoryRepo.destroy({ where: { id } });
  }
}



