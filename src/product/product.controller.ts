import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindBySortDto } from './dto/findBySort.dto';
import { Product } from './models/product.model';
import { FindAllDto } from './dto/findAll.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @ApiOperation({ summary: 'Product yaratish' })
  @ApiResponse({ status: 201, type: Product })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @ApiOperation({ summary: 'Product qidirish' })
  @ApiResponse({ status: 201, type: Product })
  @Post('/search')
  async searchProducts(@Body() findAllDto: FindAllDto) {
    try {
      const products = await this.productService.searchPro(findAllDto);
      return { products };
    } catch (error) {
      console.log(error);
      return { error: 'Internal Server Error' };
    }
  }

  @ApiOperation({ summary: "Productlarni ko'rish" })
  @ApiResponse({ status: 201, type: Product })
  @Get('all/:q')
  findAll(@Query() q: any) {
    return this.productService.findAll(q?.page, q?.limit);
  }

  @ApiOperation({ summary: 'Productlarni reitingi' })
  @ApiResponse({ status: 201, type: Product })
  @Get('reiting')
  findReiting() {
    return this.productService.getAverageRating();
  }

  @ApiOperation({ summary: "Productni id boyicha ko'rish" })
  @ApiResponse({ status: 201, type: Product })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @ApiOperation({ summary: 'Product filter' })
  @ApiResponse({ status: 201, type: Product })
  @Post('filter/:q')
  filterPro(@Body() productFilter: FindBySortDto, @Query() q: any) {
    return this.productService.findBySort(productFilter, q?.page, q?.limit);
  }

  @ApiOperation({ summary: "Productni o'zgartirish" })
  @ApiResponse({ status: 201, type: Product })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @ApiOperation({ summary: "Productni o'chirish" })
  @ApiResponse({ status: 201, type: Product })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
