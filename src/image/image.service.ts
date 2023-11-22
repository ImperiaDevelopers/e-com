import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateImageDto } from '../image/dto/create-image.dto';
import { UpdateImageDto } from '../image/dto/update-image.dto';
import { Image } from './model/image.model';
import { uploadFile } from '../units/file-upload';

@Injectable()
export class ImageService {
  constructor(@InjectModel(Image) private imageRepo: typeof Image) {}

  async createImage(createImageDto: CreateImageDto): Promise<Image> {
    const image = await this.imageRepo.create(createImageDto);
    return image;
  }

  async uploadImage(image: any) {
    try {
      const filename = await uploadFile(image);
      return { image: filename };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllImages(): Promise<Image[]> {
    const images = await this.imageRepo.findAll({ include: { all: true } });
    return images;
  }

  async getProfuctImageById(product_id: number): Promise<Image[]> {
    const images = await this.imageRepo.findAll({
      where: { product_id: product_id },
      include: { all: true },
    });
    return images;
  }

  async getImageById(id: number): Promise<Image> {
    const image = await this.imageRepo.findByPk(id);
    if (!image) {
      throw new NotFoundException('Image not found');
    }
    return image;
  }

  async deleteImageById(id: number): Promise<number> {
    const image = await this.imageRepo.findOne({ where: { id: id } });
    if (image) {
      return this.imageRepo.destroy({ where: { id } });
    }
    throw new NotFoundException('Image not found');
  }

  async updateImage(
    id: number,
    updateImageDto: UpdateImageDto,
  ): Promise<Image> {
    const image = await this.imageRepo.findOne({ where: { id: id } });
    if (image) {
      const updatedImage = await this.imageRepo.update(updateImageDto, {
        where: { id },
        returning: true,
      });
      return updatedImage[1][0].dataValues;
    }
    throw new NotFoundException('Image not found');
  }
}
