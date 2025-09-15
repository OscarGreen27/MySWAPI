import { Body, Controller, Post, Get, Put, Delete, ParseIntPipe, Param, ValidationPipe, Query } from '@nestjs/common';
import { StarshipService } from './starship.service';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';

import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Starships } from './starship.entity';

@ApiTags('Starships')
@Controller('starships')
export class StarshipController {
  constructor(private readonly StarshipServise: StarshipService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async get(@Query('page') page = 1, @Query('limit') limit = 10): Promise<Starships[]> {
    return this.StarshipServise.getSeveral(page, limit);
  }

  @Get()
  async getAll(): Promise<Starships[]> {
    return await this.StarshipServise.findAll();
  }

  @Post()
  async create(@Body() starship: CreateStarshipDto) {
    return await this.StarshipServise.create(starship);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.StarshipServise.findOne(id);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) film: UpdateStarshipDto) {
    return this.StarshipServise.update(id, film);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.StarshipServise.delete(id);
  }
}
