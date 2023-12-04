import { PartialType } from '@nestjs/swagger';
import { CreateProInfoDto } from './create-pro_info.dto';

export class UpdateProInfoDto extends PartialType(CreateProInfoDto) {}
