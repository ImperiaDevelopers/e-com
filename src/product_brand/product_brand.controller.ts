import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseFilePipe,
  UploadedFile,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  Put,
} from '@nestjs/common';
import { ProductBrandService } from './product_brand.service';
import { CreateProductBrandDto } from './dto/create-product_brand.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateProductBrandDto } from './dto/update-product_brand.dto';
import { FileUploadDto } from './dto/file-upload.dto';
import { ValidFileValidator } from '../validators/file-validators';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('ProductBrand')
@Controller('product_brand')
export class ProductBrandController {
  constructor(private readonly product_brandService: ProductBrandService) {}
  @ApiOperation({ summary: 'ProductBrand yaratish' })
  @Post()
  create(@Body() createProductBrandDto: CreateProductBrandDto) {
    return this.product_brandService.create(createProductBrandDto);
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
    return this.product_brandService.uploadImage(image);
  }

  @ApiOperation({ summary: "ProductBrandlarni ko'rish" })
  @Get()
  findAll() {
    return this.product_brandService.findAll();
  }
  @ApiOperation({ summary: "ProductBrandni ko'rish" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.product_brandService.findOne(+id);
  }
 

  @ApiOperation({ summary: "ProductBrandni o'zgartirish" })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductBrandDto: UpdateProductBrandDto,
  ) {
    return this.product_brandService.update(+id, updateProductBrandDto);
  }
  @ApiOperation({ summary: "ProductBrandni o'chirish" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.product_brandService.remove(+id);
  }
}
