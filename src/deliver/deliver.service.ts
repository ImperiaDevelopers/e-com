import { Injectable } from '@nestjs/common';
import { CreateDeliverDto } from './dto/create_deliver.dto';
import { UpdateDeliverDto } from './dto/update_deliver.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Deliver } from './models/deliver.model';

@Injectable()
export class DeliverService {
  constructor(
    @InjectModel(Deliver)
    private deliverRepository: typeof Deliver,
  ) {}

  async create(createDeliverDto: CreateDeliverDto): Promise<Deliver> {
    const newDeliver = await this.deliverRepository.create(createDeliverDto);
    return newDeliver;
  }

  async findAll(): Promise<Deliver[]> {
    const delivers = await this.deliverRepository.findAll({
      include: { all: true },
    });
    return delivers;
  }

  async findOne(id: number): Promise<Deliver> {
    const deliver = await this.deliverRepository.findOne({
      where: { id },
      include: { all: true },
    });
    return deliver;
  }

  async update(id: number, updateDeliverDto: UpdateDeliverDto) {
    const updatedDeliver = await this.deliverRepository.update(
      updateDeliverDto,
      {
        where: { id },
        returning: true,
      },
    );
    return updatedDeliver[1][0].dataValues;
  }

  async remove(id: number) {
    const removedDeliver = await this.deliverRepository.destroy({
      where: { id },
    });
    return removedDeliver;
  }
}
