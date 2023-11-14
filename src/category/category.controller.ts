import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Categor } from './models/category.model';

@Controller('category')
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Create Category' })
  @ApiResponse({ status: 201, type: Categor })
  @Post('add')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }
  @ApiOperation({ summary: 'Get Category' })
  @ApiResponse({ status: 201, type: Categor })
  @Get('all')
  findAll() {
    return this.categoryService.findAll();
  }
  @ApiOperation({ summary: 'Get Category By Id' })
  @ApiResponse({ status: 201, type: Categor })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }
  @ApiOperation({ summary: 'Update Category' })
  @ApiResponse({ status: 201, type: Categor })
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }
  @ApiOperation({ summary: 'Delete Category' })
  @ApiResponse({ status: 201, type: Categor })
  @Delete('delstroy/:id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
