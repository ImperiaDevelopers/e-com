import { PartialType } from '@nestjs/swagger';
import { CreateDeliverDto } from './create_deliver.dto';

export class UpdateDeliverDto extends PartialType(CreateDeliverDto) {}
