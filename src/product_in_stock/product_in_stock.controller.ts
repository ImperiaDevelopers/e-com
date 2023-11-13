import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductInStockService } from './product_in_stock.service';
import { CreateProductInStockDto } from './dto/create-product_in_stock.dto';
import { UpdateProductInStockDto } from './dto/update-product_in_stock.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('ProductInStock')
@Controller('product_in_stock')
export class ProductInStockController {
  constructor(
    private readonly product_in_stockService: ProductInStockService,
  ) {}
  @ApiOperation({ summary: 'ProductInStock yaratish' })
  @Post()
  create(@Body() createProductInStockDto: CreateProductInStockDto) {
    return this.product_in_stockService.create(createProductInStockDto);
  }
  @ApiOperation({ summary: "ProductInStocklarni ko'rish" })
  @Get()
  findAll() {
    return this.product_in_stockService.findAll();
  }
  @ApiOperation({ summary: "ProductInStockni ko'rish" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.product_in_stockService.findOne(+id);
  }
  @ApiOperation({ summary: "ProductInStockni o'zgartirish" })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductInStockDto: UpdateProductInStockDto,
  ) {
    return this.product_in_stockService.update(+id, updateProductInStockDto);
  }
  @ApiOperation({ summary: "ProductInStockni o'chirish" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.product_in_stockService.remove(+id);
  }
}
