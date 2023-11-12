import { Injectable } from "@nestjs/common";
import { CreateStatusDto } from "./dto/create-status.dto";
import { UpdateStatusDto } from "./dto/update-status.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Status } from "./models/status.model";

@Injectable()
export class StatusService {
  constructor(
    @InjectModel(Status) private readonly StatusRepo: typeof Status
  ) {}
  async create(createStatusDto: CreateStatusDto) {
    return await this.StatusRepo.create(createStatusDto);
  }

  async findAll() {
    return await this.StatusRepo.findAll();
  }

  async findOne(id: number) {
    return await this.StatusRepo.findByPk(id);
  }

  async update(id: number, updateStatusDto: UpdateStatusDto) {
    return await this.StatusRepo.update(updateStatusDto, { where: { id } });
  }

  async remove(id: number) {
    return await this.StatusRepo.destroy({ where: { id } });
  }
}
