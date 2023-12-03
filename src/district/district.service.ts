import {
  Injectable,
  ForbiddenException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { District } from './model/district.model';
import { GetDistrictByNameDto } from './dto/get-district-by-name.dto';

@Injectable()
export class DistrictService {
  constructor(@InjectModel(District) private districtRepo: typeof District) {}

  async createDistrict(
    createDistrictDto: CreateDistrictDto,
  ): Promise<District> {
    const district = await this.districtRepo.create(createDistrictDto);
    return district;
  }

  async getDistrictByName(
    getDstrictByName: GetDistrictByNameDto,
  ): Promise<District> {
    const district = await this.districtRepo.findOne({
      where: { name: getDstrictByName.name },
    });
    return district;
  }

  async getAllDistricts(): Promise<District[]> {
    const districts = await this.districtRepo.findAll({
      include: { all: true },
    });
    return districts;
  }

  async getDistrictById(id: number): Promise<District> {
    const district = await this.districtRepo.findOne({
      where: { id: id },
      include: { all: true },
    });
    if (!district) {
      throw new NotFoundException('District not found');
    }
    return district;
  }

  async getDistrictsByRegionId(id: number): Promise<District[]> {
    const districts = await this.districtRepo.findAll({
      where: { region_id: id },
      include: { all: true },
    });
    if (!districts) {
      throw new NotFoundException('District not found');
    }
    return districts;
  }

  async deleteDistrictById(id: number): Promise<number> {
    const district = await this.districtRepo.findOne({ where: { id: id } });
    if (district) {
      return this.districtRepo.destroy({ where: { id } });
    }
    throw new NotFoundException('District not found');
  }

  async updateDistrict(
    id: number,
    updateDistrictDto: UpdateDistrictDto,
  ): Promise<District> {
    const district = await this.districtRepo.findOne({ where: { id: id } });
    if (district) {
      const [_, [updatedDistrict]] = await this.districtRepo.update(
        updateDistrictDto,
        {
          where: { id },
          returning: true,
        },
      );
      return updatedDistrict;
    }
    throw new NotFoundException('District not found');
  }
}
