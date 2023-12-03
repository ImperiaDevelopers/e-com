import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DistrictService } from './district.service';
import { District } from './model/district.model';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('District')
@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @ApiOperation({ summary: 'Create a district' })
  @ApiResponse({
    status: 201,
    description: 'The district has been successfully created.',
    type: District,
  })
  @Post('create')
  async createDistrict(
    @Body() createDistrictDto: CreateDistrictDto,
  ): Promise<District> {
    return this.districtService.createDistrict(createDistrictDto);
  }

  @ApiOperation({ summary: 'Get all districts' })
  @ApiResponse({
    status: 200,
    description: 'Returns all districts.',
    type: [District],
  })
  @Get('all')
  async getAllDistricts(): Promise<District[]> {
    return this.districtService.getAllDistricts();
  }

  @ApiOperation({ summary: 'Get a district by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the district with the specified ID.',
    type: District,
  })
  @Get(':id')
  async getDistrictById(@Param('id') id: number): Promise<District> {
    return this.districtService.getDistrictById(id);
  }

  @ApiOperation({ summary: 'Get districts by Region id' })
  @ApiResponse({
    status: 200,
    description: 'Returns the districts with the region ID.',
    type: District,
  })
  @Post('region/:id')
  async getDistrictsByRegionName(@Param('id') id: number): Promise<District[]> {
    return this.districtService.getDistrictsByRegionId(id);
  }

  @ApiOperation({ summary: 'Delete a district by ID' })
  @ApiResponse({
    status: 200,
    description: 'The district has been successfully deleted.',
    type: Number,
  })
  @Delete(':id')
  async deleteDistrictById(@Param('id') id: number): Promise<number> {
    return this.districtService.deleteDistrictById(id);
  }

  @ApiOperation({ summary: 'Update a district' })
  @ApiResponse({
    status: 200,
    description: 'The district has been successfully updated.',
    type: District,
  })
  @Put(':id')
  async updateDistrict(
    @Param('id') id: number,
    @Body() updateDistrictDto: UpdateDistrictDto,
  ): Promise<District> {
    return this.districtService.updateDistrict(id, updateDistrictDto);
  }
}
