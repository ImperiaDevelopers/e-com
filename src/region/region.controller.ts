import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RegionService } from './region.service';
import { Region } from './model/region.model';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { GetRegionByNameDto } from './dto/get-region-by-name.dto';

@ApiTags('Region')
@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @ApiOperation({ summary: 'Create a region' })
  @ApiResponse({
    status: 201,
    description: 'The region has been successfully created.',
    type: Region,
  })
  @Post('create')
  async createRegion(
    @Body() createRegionDto: CreateRegionDto,
  ): Promise<Region> {
    return this.regionService.createRegion(createRegionDto);
  }

  @ApiOperation({ summary: 'Get all regions' })
  @ApiResponse({
    status: 200,
    description: 'Returns all regions.',
    type: [Region],
  })
  @Get('all')
  async getAllRegions(): Promise<Region[]> {
    return this.regionService.getAllRegions();
  }

  @ApiOperation({ summary: 'Get a region by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the region with the specified ID.',
    type: Region,
  })
  @Get(':id')
  async getRegionById(@Param('id') id: number): Promise<Region> {
    return this.regionService.getRegionById(id);
  }

  @ApiOperation({ summary: 'Get a region by name' })
  @ApiResponse({
    status: 200,
    description: 'Returns the region with the specified name.',
    type: Region,
  })
  @Post('name')
  async getRegionByName(
    @Body() getregionbyname: GetRegionByNameDto,
  ): Promise<Region> {
    return this.regionService.getRegionByName(getregionbyname);
  }

  @ApiOperation({ summary: 'Delete a region by ID' })
  @ApiResponse({
    status: 200,
    description: 'The region has been successfully deleted.',
    type: Number,
  })
  @Delete(':id')
  async deleteRegionById(@Param('id') id: number): Promise<number> {
    return this.regionService.deleteRegionById(id);
  }

  @ApiOperation({ summary: 'Update a region' })
  @ApiResponse({
    status: 200,
    description: 'The region has been successfully updated.',
    type: Region,
  })
  @Put(':id')
  async updateRegion(
    @Param('id') id: number,
    @Body() updateRegionDto: UpdateRegionDto,
  ): Promise<Region> {
    return this.regionService.updateRegion(id, updateRegionDto);
  }
}
