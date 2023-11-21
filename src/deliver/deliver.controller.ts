import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DeliverService } from './deliver.service';
import { CreateDeliverDto } from './dto/create_deliver.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateDeliverDto } from './dto/update_deliver.dto';

@Controller('deliver')
@ApiTags('Deliver')
export class DeliverController {
  constructor(private readonly deliverService: DeliverService) {}
  @ApiOperation({ summary: 'Deliver yaratish' })
  @Post()
  create(@Body() createDeliverDto: CreateDeliverDto) {
    return this.deliverService.create(createDeliverDto);
  }
  @ApiOperation({ summary: "Deliverlarni ko'rish" })
  @Get()
  findAll() {
    return this.deliverService.findAll();
  }
  @ApiOperation({ summary: "Deliverni ko'rish" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliverService.findOne(+id);
  }
  @ApiOperation({ summary: "Deliverni o'zgartirish" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeliverDto: UpdateDeliverDto) {
    return this.deliverService.update(+id, updateDeliverDto);
  }
  @ApiOperation({ summary: "Deliverni o'chirish" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliverService.remove(+id);
  }
}
