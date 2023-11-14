import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  //Create Category
  @ApiResponse({ status: 201, description: 'Category successfully created' })
  @ApiResponse({ status: 400, description: 'Something wrong' })
  @ApiOperation({ summary: 'Create category' })
  @Post('create')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  //Get all categories
  @ApiResponse({ status: 200, description: 'All categories are here' })
  @ApiResponse({
    status: 400,
    description: 'Any category not found or smt wrong',
  })
  @ApiOperation({ summary: 'Get all categories' })
  @Get('all')
  async getAllCategory() {
    return this.categoryService.getAllCategories();
  }

  //Get category by id
  @ApiResponse({ status: 200, description: 'Category are here' })
  @ApiResponse({
    status: 400,
    description: 'At this id category not found or smt wrong',
  })
  @ApiOperation({ summary: 'Get category by id' })
  @Get(':id')
  async getCategoryById(@Param('id') id: number) {
    return this.categoryService.getCategoryById(id);
  }

  //Update category
  @ApiResponse({ status: 200, description: 'Category successfully updated' })
  @ApiResponse({ status: 400, description: 'Category not found or smt wrong' })
  @ApiOperation({ summary: 'Update category by id' })
  @Put('update/:id')
  async updateCategoryById(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategoryById(id, updateCategoryDto);
  }

  //Delete category
  @ApiResponse({ status: 200, description: 'Category successfully deleted' })
  @ApiResponse({ status: 400, description: 'Category not found or smt wrong' })
  @ApiOperation({ summary: 'Delete category by id' })
  @Delete('delete/:id')
  async deleteCategoryById(@Param('id') id: number) {
    return this.categoryService.deleteCategory(id);
  }
}
