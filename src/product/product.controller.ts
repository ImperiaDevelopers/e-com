import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FindBySortDto } from './dto/findBySort.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @ApiOperation({ summary: 'Product yaratish' })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @ApiOperation({ summary: "Productlarni ko'rish" })
  @Get('all/:q')
  findAll(@Query() q: any) {
    return this.productService.findAll(q?.page, q?.limit);
  }

  @ApiOperation({ summary: "Productni ko'rish" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Post('filter')
  filterPro(@Body() productFilter: FindBySortDto) {
    return this.productService.findBySort(productFilter);
  }

  @Get('pro-cat')
  getCatPro(@Param('id') id: string) {
    return this.productService.categoryPro(+id);
  }

  @ApiOperation({ summary: "Productni o'zgartirish" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }
  @ApiOperation({ summary: "Productni o'chirish" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
