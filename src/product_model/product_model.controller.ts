import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseFilePipe,
  UploadedFile,
  HttpCode,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { ProductModelService } from './product_model.service';
import { CreateProductModelDto } from './dto/create-product_model.dto';
import { UpdateProductModelDto } from './dto/update-product_model.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileUploadDto } from './dto/file-upload.dto';
import { ValidFileValidator } from '../validators/file-validators';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Product  Model')
@Controller('product_model')
export class ProductModelController {
  constructor(private readonly product_modelService: ProductModelService) {}
  @ApiOperation({ summary: 'ProductModel yaratish' })
  @Post()
  create(@Body() createProductModelDto: CreateProductModelDto) {
    return this.product_modelService.create(createProductModelDto);
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
    return this.product_modelService.uploadImage(image);
  }

  @ApiOperation({ summary: "ProductModellarni ko'rish" })
  @Get()
  findAll() {
    return this.product_modelService.findAll();
  }
  @ApiOperation({ summary: "ProductModelni ko'rish" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.product_modelService.findOne(+id);
  }
  @ApiOperation({ summary: "ProductModelni o'zgartirish" })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductModelDto: UpdateProductModelDto,
  ) {
    return this.product_modelService.update(+id, updateProductModelDto);
  }
  @ApiOperation({ summary: "ProductModelni o'chirish" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.product_modelService.remove(+id);
  }
}
