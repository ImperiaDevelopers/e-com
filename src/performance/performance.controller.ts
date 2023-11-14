import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PerformanceService } from './performance.service';
import { CreatePerformanceDto } from './dto/create-performance.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdatePerformanceDto } from './dto/update-performance.dto';

@ApiTags('Performance')
@Controller('performance')
export class PerformanceController {
  constructor(private readonly performanceService: PerformanceService) {}

  //Create performance
  @ApiResponse({ status: 201, description: 'Performance successfully created' })
  @ApiResponse({ status: 400, description: 'Something wrong' })
  @ApiOperation({ summary: 'Create performance' })
  @Post('create')
  async createPerformance(@Body() createPerformanceDto: CreatePerformanceDto) {
    return this.performanceService.createPerformance(createPerformanceDto);
  }

  //Get all performances
  @ApiResponse({ status: 200, description: 'All performances are here' })
  @ApiResponse({ status: 400, description: 'Something wrong' })
  @ApiOperation({ summary: 'Get all performances' })
  @Get('all')
  async getAllPerformances() {
    return this.performanceService.getAllPerformances();
  }

  //Get performance by id
  @ApiResponse({ status: 200, description: 'Performance is here' })
  @ApiResponse({ status: 400, description: 'Something wrong' })
  @ApiOperation({ summary: 'Get performance by id' })
  @Get(':id')
  async getPerformanceById(@Param('id') id: number) {
    return this.performanceService.getPerformanceById(id);
  }

  //Update performance by id
  @ApiResponse({
    status: 200,
    description: 'Performance is successfully updated',
  })
  @ApiResponse({
    status: 400,
    description: 'Performance is noy found or something wrong',
  })
  @ApiOperation({ summary: 'Update performance by id' })
  @Put('update/:id')
  async updatePerformanceById(
    @Param('id') id: number,
    @Body() updatePerformanceDto: UpdatePerformanceDto,
  ) {
    return this.performanceService.updatePerformanceById(
      id,
      updatePerformanceDto,
    );
  }

  //Delete performance by id
  @ApiResponse({
    status: 200,
    description: 'Performances successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Performance not found or something wrong',
  })
  @ApiOperation({ summary: 'Delete performance' })
  @Delete('delete/:id')
  async deletePerformances(@Param('id') id: number) {
    return this.performanceService.deletePerformanceById(id);
  }
}
