import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin)
    private adminRepository: typeof Admin,
  ) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const newAdmin = await this.adminRepository.create(createAdminDto);
    return newAdmin;
  }

  async findAll(): Promise<Admin[]> {
    const admins = await this.adminRepository.findAll({
      include: { all: true },
    });
    return admins;
  }

  async findOne(id: number): Promise<Admin> {
    const admin = await this.adminRepository.findOne({
      where: { id },
      include: { all: true },
    });
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const updatedAdmin = await this.adminRepository.update(updateAdminDto, {
      where: { id },
      returning: true,
    });
    return updatedAdmin[1][0].dataValues;
  }

  async remove(id: number) {
    const removedAdmin = await this.adminRepository.destroy({
      where: { id },
    });
    return removedAdmin;
  }
}
