import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './models/comment.model';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment) private readonly CommentRepo: typeof Comment,
  ) {}
  async create(createCommentDto: CreateCommentDto) {
    return await this.CommentRepo.create(createCommentDto);
  }

  async findAll() {
    return await this.CommentRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    await this.CommentRepo.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    return await this.CommentRepo.update(updateCommentDto, { where: { id } });
  }

  async remove(id: number) {
    return await this.CommentRepo.destroy({ where: { id } });
  }
}
