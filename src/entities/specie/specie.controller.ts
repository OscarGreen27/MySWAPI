import { Body, Controller, Post, Get, Put, Delete, ParseIntPipe, Param, ValidationPipe, Query } from '@nestjs/common';
import { SpecieService } from './specie.service';
import { CreateSpecieDto } from './dto/create-specie.dto';
import { UpdateSpecieDto } from './dto/update-specie.dto';

import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Species } from './specie.entity';

@ApiTags('Specie')
@Controller('species')
export class SpecieController {
  constructor(private readonly specieServise: SpecieService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async get(@Query('page') page = 1, @Query('limit') limit = 10): Promise<Species[]> {
    return this.specieServise.getSeveral(page, limit);
  }

  @Get()
  async getAll(): Promise<Species[]> {
    return await this.specieServise.findAll();
  }

  @Post()
  async create(@Body() specie: CreateSpecieDto) {
    return await this.specieServise.create(specie);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.specieServise.findOne(id);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) specie: UpdateSpecieDto) {
    return this.specieServise.update(id, specie);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.specieServise.delete(id);
  }
}
