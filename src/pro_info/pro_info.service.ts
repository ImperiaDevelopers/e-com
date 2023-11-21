import { Injectable } from '@nestjs/common';
import { CreateProInfoDto } from './dto/create-pro_info.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateProInfoDto } from './dto/update-pro_info.dto';
import { ProInfo } from './models/pro_info.model';

@Injectable()
export class ProInfoService {
  constructor(@InjectModel(ProInfo) private proInfoRepo: typeof ProInfo) {}
  async create(createProInfoDto: CreateProInfoDto): Promise<ProInfo> {
    const proInfo = await this.proInfoRepo.create(createProInfoDto);
    return proInfo;
  }

  async findAll(): Promise<ProInfo[]> {
    const proInfo = await this.proInfoRepo.findAll({ include: { all: true } });
    return proInfo;
  }

  async findOne(id: number): Promise<ProInfo> {
    const proInfo = await this.proInfoRepo.findOne({
      where: { id },
      include: { all: true },
    });
    return proInfo;
  }

  async update(id: number, updateProInfoDto: UpdateProInfoDto) {
    const proInfo = await this.proInfoRepo.update(updateProInfoDto, {
      where: { id },
      returning: true,
    });
    return proInfo[1][0].dataValues;
  }

  async remove(id: number): Promise<number> {
    return this.proInfoRepo.destroy({ where: { id } });
  }
}
