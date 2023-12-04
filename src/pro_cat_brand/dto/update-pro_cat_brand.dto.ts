import { PartialType } from '@nestjs/swagger';
import { CreateProCatBrandDto } from './create-pro_cat_brand.dto';

export class UpdateProCatBrandDto extends PartialType(CreateProCatBrandDto) {}



