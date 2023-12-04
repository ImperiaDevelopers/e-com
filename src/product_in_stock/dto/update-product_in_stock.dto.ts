import { PartialType } from '@nestjs/swagger';
import { CreateProductInStockDto } from './create-product_in_stock.dto';

export class UpdateProductInStockDto extends PartialType(
  CreateProductInStockDto,
) {}
