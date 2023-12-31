import { Injectable } from '@nestjs/common';
import { CreateViewDto } from './dto/create-view.dto';
import { UpdateViewDto } from './dto/update-view.dto';
import { InjectModel } from '@nestjs/sequelize';
import { View } from './models/view.model';
import { Product } from '../product/models/product.model';
import { Image } from '../image/model/image.model';

@Injectable()
export class ViewsService {
  constructor(@InjectModel(View) private readonly ViewRepo: typeof View) {}
  async create(createViewDto: CreateViewDto) {
    return await this.ViewRepo.create(createViewDto);
  }

  async findAll() {
    return await this.ViewRepo.findAll({ include: { all: true } });
  }

  async findAllClientViews(id: number) {
    return await this.ViewRepo.findAll({
      where: { client_id: id },
      include: [
        {
          model: Product,
          include: [{ model: Image }],
        },
      ],
    });
  }

  async findOne(id: number) {
    return await this.ViewRepo.findByPk(id, {
      include: { all: true },
    });
  }

  async update(id: number, updateViewDto: UpdateViewDto) {
    return await this.ViewRepo.update(updateViewDto, { where: { id } });
  }

  async remove(id: number) {
    return await this.ViewRepo.destroy({ where: { id } });
  }
}
