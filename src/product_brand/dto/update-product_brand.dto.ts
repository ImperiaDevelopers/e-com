import { PartialType } from '@nestjs/swagger';
import { CreateProductBrandDto } from './create-product_brand.dto';

export class UpdateProductBrandDto extends PartialType(CreateProductBrandDto) {}
