import { PartialType } from '@nestjs/swagger';
import { CreateProPerfomanceGroupDto } from './create_pro_perfomance_group.dto';

export class UpdateProPerfomanceGroupDto extends PartialType(
  CreateProPerfomanceGroupDto,
) {}
