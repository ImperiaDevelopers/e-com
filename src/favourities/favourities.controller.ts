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
import { FavouritiesService } from './favourities.service';
import { CreateFavourityDto } from './dto/create-favourity.dto';
import { UpdateFavourityDto } from './dto/update-favourity.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Favourity } from './models/favourity.model';

@ApiTags('Favourite')
@Controller('favourities')
export class FavouritiesController {
  constructor(private readonly favouritiesService: FavouritiesService) {}

  @ApiOperation({ summary: 'post Favourity' })
  @ApiResponse({ status: 201, type: Favourity })
  @Post('add')
  async create(@Body() createFavourityDto: CreateFavourityDto) {
    return this.favouritiesService.create(createFavourityDto);
  }

  @ApiOperation({ summary: 'get Favourity' })
  @ApiResponse({ status: 201, type: Favourity })
  @Get('all')
  async findAll(): Promise<Favourity[]> {
    return this.favouritiesService.findAll();
  }

  @ApiOperation({ summary: 'get client favouriteds' })
  @ApiResponse({ status: 201, type: Favourity })
  @Get('clientliked/:id')
  async findClientLiked(@Param('id') client_id: number): Promise<Favourity[]> {
    return this.favouritiesService.findClientLiked(client_id);
  }

  @ApiOperation({ summary: 'get favourity by id' })
  @ApiResponse({ status: 201, type: Favourity })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Favourity> {
    return this.favouritiesService.findOne(id);
  }

  @ApiOperation({ summary: 'put/:id Favourity' })
  @ApiResponse({ status: 201, type: Favourity })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateFavourityDto: UpdateFavourityDto,
  ): Promise<Favourity> {
    return this.favouritiesService.update(+id, updateFavourityDto);
  }

  @ApiOperation({ summary: 'delete/:id Favourity' })
  @ApiResponse({ status: 201, type: Favourity })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favouritiesService.remove(+id);
  }
}
