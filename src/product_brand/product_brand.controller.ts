import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductBrandService } from './product_brand.service';
import { CreateProductBrandDto } from './dto/create-product_brand.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateProductBrandDto } from './dto/update-product_brand.dto';

@ApiTags('ProductBrand')
@Controller('product_brand')
export class ProductBrandController {
  constructor(private readonly product_brandService: ProductBrandService) {}
  @ApiOperation({ summary: 'ProductBrand yaratish' })
  @Post()
  create(@Body() createProductBrandDto: CreateProductBrandDto) {
    return this.product_brandService.create(createProductBrandDto);
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
  @Post('filter-brand')
  findProBrand(@Param('id') id: string){
    return this.product_brandService.findbrandCat(+id)
  }

  @ApiOperation({ summary: "ProductBrandni o'zgartirish" })
  @Patch(':id')
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
