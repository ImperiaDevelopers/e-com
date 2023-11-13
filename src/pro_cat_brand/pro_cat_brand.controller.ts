import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProCatBrandService } from './pro_cat_brand.service';
import { CreateProCatBrandDto } from './dto/create-pro_cat_brand.dto';
import { UpdateProCatBrandDto } from './dto/update-pro_cat_brand.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProCatBrand } from './models/pro_cat_brand.model';

@Controller('pro-cat-brand')
@ApiTags('Product Category Brand')
export class ProCatBrandController {
  constructor(private readonly proCatBrandService: ProCatBrandService) {}

  @ApiOperation({ summary: 'post ProCatBrand' })
  @ApiResponse({ status: 201, type: ProCatBrand })
  @Post()
  create(@Body() createProCatBrandDto: CreateProCatBrandDto) {
    return this.proCatBrandService.create(createProCatBrandDto);
  }

  @ApiOperation({ summary: 'get ProCatBrand' })
  @ApiResponse({ status: 201, type: ProCatBrand })
  @Get()
  findAll(): Promise<ProCatBrand[]> {
    return this.proCatBrandService.findAll();
  }

  @ApiOperation({ summary: 'get/:id ProCatBrand' })
  @ApiResponse({ status: 201, type: ProCatBrand })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProCatBrand> {
    return this.proCatBrandService.findOne(+id);
  }

  @ApiOperation({ summary: 'put/:id ProCatBrand' })
  @ApiResponse({ status: 201, type: ProCatBrand })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProCatBrandDto: UpdateProCatBrandDto,
  ): Promise<ProCatBrand> {
    return this.proCatBrandService.update(+id, updateProCatBrandDto);
  }

  @ApiOperation({ summary: 'delete/:id ProCatBrand' })
  @ApiResponse({ status: 201, type: ProCatBrand })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proCatBrandService.remove(+id);
  }
}
