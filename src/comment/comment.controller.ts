import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Comment } from './models/comment.model';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: 'Create Comment' })
  @ApiResponse({ status: 201, type: Comment })
  @Post('add')
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }
  @ApiOperation({ summary: 'Get Comment' })
  @ApiResponse({ status: 201, type: Comment })
  @Get('all')
  findAll() {
    return this.commentService.findAll();
  }
  @ApiOperation({ summary: 'Get Comment By Id' })
  @ApiResponse({ status: 201, type: Comment })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }
  @ApiOperation({ summary: 'Update Comment' })
  @ApiResponse({ status: 201, type: Comment })
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }
  @ApiOperation({ summary: 'Delete Comment' })
  @ApiResponse({ status: 201, type: Comment })
  @Delete('delstroy/:id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
