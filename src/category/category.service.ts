import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models/category.model';
import { Op } from 'sequelize';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private readonly CategoryRepo: typeof Category,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    return await this.CategoryRepo.create(createCategoryDto);
  }

  async findAll() {
    return await this.CategoryRepo.findAll({ include: { all: true } });
  }

  async findOnlyParCats() {
    return await this.CategoryRepo.findAll({
      where: { parent_category_id: { [Op.not]: null } },
      include: { all: true },
    });
  }

  async findOne(id: number) {
    await this.CategoryRepo.findOne({
      where: { id: id },
      include: { all: true },
    });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.CategoryRepo.update(updateCategoryDto, { where: { id } });
  }

  async remove(id: number) {
    return await this.CategoryRepo.destroy({ where: { id } });
  }
}
