import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Card } from './models/card.model';

@ApiTags('Card')
@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @ApiOperation({ summary: 'Create Card' })
  @ApiResponse({ status: 201, type: Card })
  @Post('add')
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardService.create(createCardDto);
  }

  @ApiOperation({ summary: 'Get all Cards' })
  @ApiResponse({ status: 201, type: Card })
  @Get('all')
  findAll() {
    return this.cardService.findAll();
  }

  @ApiOperation({ summary: 'Get all client cards' })
  @ApiResponse({ status: 201, type: Card })
  @Get('client/:id')
  findAllClientCards(@Param('id') client_id: number) {
    return this.cardService.findAllClientCards(client_id);
  }

  @ApiOperation({ summary: 'Create Card By Id' })
  @ApiResponse({ status: 201, type: Card })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update Card' })
  @ApiResponse({ status: 201, type: Card })
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardService.update(+id, updateCardDto);
  }

  @ApiOperation({ summary: 'Delete Card' })
  @ApiResponse({ status: 201, type: Card })
  @Delete('destroy/:id')
  remove(@Param('id') id: string) {
    return this.cardService.remove(+id);
  }
}
