import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Status } from './models/status.model';

@Controller('status')
@ApiTags('Status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @ApiOperation({ summary: 'Create Status' })
  @ApiResponse({ status: 201, type: Status })
  @Post('add')
  create(@Body() createStatusDto: CreateStatusDto) {
    return this.statusService.create(createStatusDto);
  }

  @ApiOperation({ summary: 'Get Status' })
  @ApiResponse({ status: 201, type: Status })
  @Get('all')
  findAll() {
    return this.statusService.findAll();
  }

  @ApiOperation({ summary: 'Get Status By Id' })
  @ApiResponse({ status: 201, type: Status })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update Status' })
  @ApiResponse({ status: 201, type: Status })
  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateStatusDto: UpdateStatusDto) {
    return this.statusService.update(+id, updateStatusDto);
  }

  @ApiOperation({ summary: 'Delete Status' })
  @ApiResponse({ status: 201, type: Status })
  @Delete('delstroy/:id')
  remove(@Param('id') id: string) {
    return this.statusService.remove(+id);
  }
}
