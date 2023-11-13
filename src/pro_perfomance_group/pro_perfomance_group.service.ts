import { Injectable } from '@nestjs/common';
import { UpdateProPerfomanceGroupDto } from './dto/update_pro_perfomance_group.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ProPerfomanceGroup } from './models/pro_perfomance_group.model';
import { CreateProPerfomanceGroupDto } from './dto/create_pro_perfomance_group.dto';

@Injectable()
export class ProPerfomanceGroupService {
  constructor(
    @InjectModel(ProPerfomanceGroup)
    private properfomancegroupRepository: typeof ProPerfomanceGroup,
  ) {}

  async create(
    createProPerfomanceGroupDto: CreateProPerfomanceGroupDto,
  ): Promise<ProPerfomanceGroup> {
    const newProPerfomanceGroup =
      await this.properfomancegroupRepository.create(
        createProPerfomanceGroupDto,
      );
    return newProPerfomanceGroup;
  }

  async findAll(): Promise<ProPerfomanceGroup[]> {
    const pro_perfomance_groups =
      await this.properfomancegroupRepository.findAll({
        include: { all: true },
      });
    return pro_perfomance_groups;
  }

  async findOne(id: number): Promise<ProPerfomanceGroup> {
    const pro_perfomance_group =
      await this.properfomancegroupRepository.findOne({
        where: { id },
        include: { all: true },
      });
    return pro_perfomance_group;
  }

  async update(
    id: number,
    updateProPerfomanceGroupDto: UpdateProPerfomanceGroupDto,
  ) {
    const updatedProPerfomanceGroup =
      await this.properfomancegroupRepository.update(
        updateProPerfomanceGroupDto,
        {
          where: { id },
          returning: true,
        },
      );
    return updatedProPerfomanceGroup[1][0].dataValues;
  }

  async remove(id: number) {
    const removedProPerfomanceGroup =
      await this.properfomancegroupRepository.destroy({
        where: { id },
      });
    return removedProPerfomanceGroup;
  }
}
