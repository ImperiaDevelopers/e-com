import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  HttpStatus,
  HttpCode,
  UploadedFile,
  ParseFilePipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Category } from './models/category.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadDto } from './dto/file-upload.dto';
import { ValidFileValidator } from '../validators/file-validators';

@Controller('category')
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Create Category' })
  @ApiResponse({ status: 201, type: Category })
  @Post('add')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image (png, jpeg)*',
    type: FileUploadDto,
  })
  @ApiOperation({ summary: 'Upload new image' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'succesfully uploaded',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid image',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Token is not found',
  })
  @Post('upload-image')
  @HttpCode(HttpStatus.CREATED)
  uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new ValidFileValidator({})],
      }),
    )
    image: FileUploadDto,
  ) {
    return this.categoryService.uploadImage(image);
  }

  @ApiOperation({ summary: 'Category qidirish' })
  @ApiResponse({ status: 201, type: Category })
  @Post('/search')
  async searchCategorys(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      const categorys = await this.categoryService.searchCat(createCategoryDto);
      return { categorys };
    } catch (error) {
      console.log(error);
      return { error: 'Internal Server Error' };
    }
  }

  @ApiOperation({ summary: 'Get Category' })
  @ApiResponse({ status: 201, type: Category })
  @Get('all')
  findAll() {
    return this.categoryService.findAll();
  }
  @ApiOperation({ summary: 'Get Category By Id' })
  @ApiResponse({ status: 201, type: Category })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }
  @ApiOperation({ summary: 'Update Category' })
  @ApiResponse({ status: 201, type: Category })
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }
  @ApiOperation({ summary: 'Delete Category' })
  @ApiResponse({ status: 201, type: Category })
  @Delete('delstroy/:id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
