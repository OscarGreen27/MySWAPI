import { Body, Controller, Post, Get, Put, Delete, ParseIntPipe, Param, ValidationPipe, Query } from '@nestjs/common';
import { PlanetService } from './planet.service';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { CreatePlanetDto } from './dto/create-planet.dto';

import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { Planets } from './planet.entity';

@ApiTags('Planets')
@Controller('planets')
@Controller('planets')
export class PlanetController {
  constructor(private readonly PlanetServise: PlanetService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async get(@Query('page') page = 1, @Query('limit') limit = 10): Promise<Planets[]> {
    return this.PlanetServise.getSeveral(page, limit);
  }

  @Get()
  async getAll(): Promise<Planets[]> {
    return await this.PlanetServise.findAll();
  }

  @Post()
  async create(@Body() planet: CreatePlanetDto) {
    return await this.PlanetServise.create(planet);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.PlanetServise.findOne(id);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) planet: UpdatePlanetDto) {
    return await this.PlanetServise.update(id, planet);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.PlanetServise.delete(id);
  }
}
