import {
  Injectable,
  ForbiddenException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region } from './model/region.model';

@Injectable()
export class RegionService {
  constructor(@InjectModel(Region) private regionRepo: typeof Region) {}

  async createRegion(createRegionDto: CreateRegionDto): Promise<Region> {
    const region = await this.regionRepo.create(createRegionDto);
    return region;
  }

  async getAllRegions(): Promise<Region[]> {
    const regions = await this.regionRepo.findAll();
    return regions;
  }

  async getRegionById(id: number): Promise<Region> {
    const region = await this.regionRepo.findByPk(id);
    if (!region) {
      throw new NotFoundException('Region not found');
    }
    return region;
  }

  async deleteRegionById(id: number): Promise<number> {
    const region = await this.regionRepo.findOne({ where: { id: id } });
    if (region) {
      return this.regionRepo.destroy({ where: { id } });
    }
    throw new NotFoundException('Region not found');
  }

  async updateRegion(
    id: number,
    updateRegionDto: UpdateRegionDto,
  ): Promise<Region> {
    const region = await this.regionRepo.findOne({ where: { id: id } });
    if (region) {
      const [_, [updatedRegion]] = await this.regionRepo.update(
        updateRegionDto,
        {
          where: { id },
          returning: true,
        },
      );
      return updatedRegion;
    }
    throw new NotFoundException('Region not found');
  }
}
