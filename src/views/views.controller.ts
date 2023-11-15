import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ViewsService } from './views.service';
import { CreateViewDto } from './dto/create-view.dto';
import { UpdateViewDto } from './dto/update-view.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { View } from './models/view.model';

@Controller('views')
@ApiTags('Views')
export class ViewsController {
  constructor(private readonly viewsService: ViewsService) {}

  @ApiOperation({ summary: 'Create Comment' })
  @ApiResponse({ status: 201, type: View })
  @Post('add')
  create(@Body() createViewDto: CreateViewDto) {
    return this.viewsService.create(createViewDto);
  }

  @ApiOperation({ summary: 'Get All Vuews' })
  @ApiResponse({ status: 201, type: View })
  @Get('all')
  findAll() {
    return this.viewsService.findAll();
  }

  @ApiOperation({ summary: 'Get Views By Id' })
  @ApiResponse({ status: 201, type: View })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.viewsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update Views' })
  @ApiResponse({ status: 201, type: View })
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateViewDto: UpdateViewDto) {
    return this.viewsService.update(+id, updateViewDto);
  }

  @ApiOperation({ summary: 'Delete View' })
  @ApiResponse({ status: 201, type: View })
  @Delete('destor/:id')
  remove(@Param('id') id: string) {
    return this.viewsService.remove(+id);
  }
}
