import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductModelService } from './product_model.service';
import { CreateProductModelDto } from './dto/create-product_model.dto';
import { UpdateProductModelDto } from './dto/update-product_model.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Product  Model')
@Controller('product_model')
export class ProductModelController {
  constructor(private readonly product_modelService: ProductModelService) {}
  @ApiOperation({ summary: 'ProductModel yaratish' })
  @Post()
  create(@Body() createProductModelDto: CreateProductModelDto) {
    return this.product_modelService.create(createProductModelDto);
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
