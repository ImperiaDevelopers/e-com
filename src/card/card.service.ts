import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Card } from './models/card.model';

@Injectable()
export class CardService {
  constructor(@InjectModel(Card) private readonly CardRepo: typeof Card) {}
  async create(createCardDto: CreateCardDto) {
    return await this.CardRepo.create(createCardDto);
  }

  async findAll() {
    return await this.CardRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.CardRepo.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateCardDto: UpdateCardDto) {
    return await this.CardRepo.update(updateCardDto, { where: { id } });
  }

  async remove(id: number) {
    return await this.CardRepo.destroy({ where: { id } });
  }
}
