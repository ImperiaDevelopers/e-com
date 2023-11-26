import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Card } from './models/card.model';
import { Product } from '../product/models/product.model';
import { Category } from '../category/models/category.model';
import { Image } from '../image/model/image.model';

@Injectable()
export class CardService {
  constructor(@InjectModel(Card) private readonly CardRepo: typeof Card) {}
  async create(createCardDto: CreateCardDto) {
    const isClientProductExists = await this.CardRepo.findOne({
      where: {
        product_id: createCardDto.product_id,
        client_id: createCardDto.client_id,
      },
    });
    if (isClientProductExists) {
      const payload = {
        product_id: createCardDto.product_id,
        client_id: createCardDto.client_id,
        price: createCardDto.price,
        quantity: createCardDto.quantity + 1,
      };
      return await this.CardRepo.update(payload, {
        where: {
          product_id: createCardDto.product_id,
          client_id: createCardDto.client_id,
        },
      });
    }
    return await this.CardRepo.create(createCardDto);
  }

  async findAll() {
    return await this.CardRepo.findAll({ include: { all: true } });
  }

  async findAllClientCards(client_id: number) {
    return await this.CardRepo.findAll({
      where: { client_id: client_id },
      include: [
        {
          model: Product,
          include: [{ model: Image }],
        },
      ],
    });
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
