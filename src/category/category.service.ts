import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models/category.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Response } from 'express';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category) private CategoryRepo: typeof Category) {}

  //Create category
  async createCategory(createCategoryDto: CreateCategoryDto) {
    const category = await this.CategoryRepo.findOne({
      where: { category_name: createCategoryDto.category_name },
    });
    if (category) throw new BadRequestException('Category already exists');

    const newCategory = await this.CategoryRepo.create({
      ...createCategoryDto,
    });

    const response = {
      message: 'Category successfully created',
      category: newCategory,
    };

    return response;
  }

  //Get categories
  async getAllCategories() {
    const categories = await this.CategoryRepo.findAll({
      include: { all: true },
    });
    if (categories.length) return categories;
    throw new BadRequestException('Any category not found');
  }

  //Get category by id
  async getCategoryById(id: number) {
    const category = await this.CategoryRepo.findOne({
      where: { id: id },
      include: { all: true },
    });
    if (category) return category;
    throw new BadRequestException('Category not found at this id or smt wrong');
  }

  //Update category
  async updateCategoryById(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.CategoryRepo.findByPk(id);
    if (category) {
      const updating = await this.CategoryRepo.update(updateCategoryDto, {
        where: { id: id },
        returning: true,
      });
      return updating[1][0].dataValues;
    }
    throw new BadRequestException('Category not found or smt wrong');
  }

  //Delete category
  async deleteCategory(id: number) {
    const category = await this.CategoryRepo.findByPk(id);
    if (category) {
      const deleting = await this.CategoryRepo.destroy({ where: { id: id } });
      if (deleting) return deleting;
      throw new BadRequestException('Something went wrong');
    }
    throw new BadRequestException('Category not found or smt wrong');
  }
}
