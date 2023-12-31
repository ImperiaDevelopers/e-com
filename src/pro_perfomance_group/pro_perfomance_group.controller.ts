import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProPerfomanceGroupService } from './pro_perfomance_group.service';
import { CreateProPerfomanceGroupDto } from './dto/create_pro_perfomance_group.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateProPerfomanceGroupDto } from './dto/update_pro_perfomance_group.dto';

@ApiTags('ProDuct Perfomance Group')
@Controller('pro_perfomance_group')
export class ProPerfomanceGroupController {
  constructor(
    private readonly pro_perfomance_groupService: ProPerfomanceGroupService,
  ) {}
  @ApiOperation({ summary: 'ProPerfomanceGroup yaratish' })
  @Post()
  create(@Body() createProPerfomanceGroupDto: CreateProPerfomanceGroupDto) {
    return this.pro_perfomance_groupService.create(createProPerfomanceGroupDto);
  }
  @ApiOperation({ summary: "ProPerfomanceGrouplarni ko'rish" })
  @Get()
  findAll() {
    return this.pro_perfomance_groupService.findAll();
  }
  @ApiOperation({ summary: "ProPerfomanceGroupni ko'rish" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pro_perfomance_groupService.findOne(+id);
  }
  @ApiOperation({ summary: "ProPerfomanceGroupni o'zgartirish" })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProPerfomanceGroupDto: UpdateProPerfomanceGroupDto,
  ) {
    return this.pro_perfomance_groupService.update(
      +id,
      updateProPerfomanceGroupDto,
    );
  }
  @ApiOperation({ summary: "ProPerfomanceGroupni o'chirish" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pro_perfomance_groupService.remove(+id);
  }
}
