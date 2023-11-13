import { PartialType } from '@nestjs/swagger';
import { CreateFavourityDto } from './create-favourity.dto';

export class UpdateFavourityDto extends PartialType(CreateFavourityDto) {}
