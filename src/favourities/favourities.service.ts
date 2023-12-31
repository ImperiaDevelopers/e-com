import { Injectable } from '@nestjs/common';
import { CreateFavourityDto } from './dto/create-favourity.dto';
import { UpdateFavourityDto } from './dto/update-favourity.dto';
import { Favourity } from './models/favourity.model';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from '../product/models/product.model';
import { Image } from '../image/model/image.model';

@Injectable()
export class FavouritiesService {
  constructor(
    @InjectModel(Favourity) private favourityRepo: typeof Favourity,
  ) {}
  async create(createFavourityDto: CreateFavourityDto): Promise<Favourity> {
    const favourite = await this.favourityRepo.create(createFavourityDto);
    return favourite;
  }

  async findAll(): Promise<Favourity[]> {
    const favourite = await this.favourityRepo.findAll({
      include: { all: true },
    });
    return favourite;
  }

  async findClientLiked(client_id: number): Promise<Favourity[]> {
    const favourite = await this.favourityRepo.findAll({
      where: { client_id: client_id },
      include: [
        {
          model: Product,
          include: [{ model: Image }],
        },
      ],
    });
    return favourite;
  }

  async findOne(id: number): Promise<Favourity> {
    const favourite = await this.favourityRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return favourite;
  }

  async update(id: number, updateFavourityDto: UpdateFavourityDto) {
    const favourite = await this.favourityRepo.update(updateFavourityDto, {
      where: { id },
      returning: true,
    });
    return favourite[1][0].dataValues;
  }

  async remove(id: number): Promise<number> {
    return this.favourityRepo.destroy({ where: { id } });
  }
}
