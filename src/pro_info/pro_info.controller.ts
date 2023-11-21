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
import { ProInfoService } from './pro_info.service';
import { CreateProInfoDto } from './dto/create-pro_info.dto';
import { UpdateProInfoDto } from './dto/update-pro_info.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProInfo } from './models/pro_info.model';

@ApiTags('Product Information')
@Controller('pro-info')
export class ProInfoController {
  constructor(private readonly proInfoService: ProInfoService) {}

  @ApiOperation({ summary: 'post ProInf' })
  @ApiResponse({ status: 201, type: ProInfo })
  @Post()
  async create(@Body() createProInfoDto: CreateProInfoDto) {
    return this.proInfoService.create(createProInfoDto);
  }

  @ApiOperation({ summary: 'get ProInf' })
  @ApiResponse({ status: 201, type: ProInfo })
  @Get()
  findAll(): Promise<ProInfo[]> {
    return this.proInfoService.findAll();
  }

  @ApiOperation({ summary: 'get/:id ProInf' })
  @ApiResponse({ status: 201, type: ProInfo })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProInfo> {
    return this.proInfoService.findOne(+id);
  }

  @ApiOperation({ summary: 'put/:id ProInf' })
  @ApiResponse({ status: 201, type: ProInfo })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProInfoDto: UpdateProInfoDto,
  ): Promise<ProInfo> {
    return this.proInfoService.update(+id, updateProInfoDto);
  }

  @ApiOperation({ summary: 'delete/:id ProInf' })
  @ApiResponse({ status: 201, type: ProInfo })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proInfoService.remove(+id);
  }
}
