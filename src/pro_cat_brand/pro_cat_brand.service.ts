import { Injectable } from '@nestjs/common';
import { CreateProCatBrandDto } from './dto/create-pro_cat_brand.dto';
import { UpdateProCatBrandDto } from './dto/update-pro_cat_brand.dto';
import { ProCatBrand } from './models/pro_cat_brand.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ProCatBrandService {
  constructor(
    @InjectModel(ProCatBrand) private proCatBrandRepo: typeof ProCatBrand,
  ) {}

  async create(
    createProCatBrandDto: CreateProCatBrandDto,
  ): Promise<ProCatBrand> {
    const proCatBrand = await this.proCatBrandRepo.create(createProCatBrandDto);
    return proCatBrand;
  }

  async findAll(): Promise<ProCatBrand[]> {
    const proCatBrand = await this.proCatBrandRepo.findAll({
      include: { all: true },
    });
    return proCatBrand;
  }

  async findOne(id: number): Promise<ProCatBrand> {
    const proCatBrand = await this.proCatBrandRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return proCatBrand;
  }

  async update(id: number, updateProCatBrandDto: UpdateProCatBrandDto) {
    const proCatBrand = await this.proCatBrandRepo.update(
      updateProCatBrandDto,
      {
        where: { id },
        returning: true,
      },
    );
    return proCatBrand[1][0].dataValues;
  }

  async remove(id: number): Promise<number> {
    return this.proCatBrandRepo.destroy({ where: { id } });
  }
}
