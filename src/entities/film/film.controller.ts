import { Body, Controller, Post, Get, Put, Delete, ParseIntPipe, Param, Query } from '@nestjs/common';
import { FilmService } from './film.service';
import { UpdateFilmDto } from './dto/update-film.dto';
import { CreateFilmDto } from './dto/create-film.dto';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { Films } from './film.entity';

@ApiTags('Films')
@Controller('films')
export class FilmController {
  constructor(private readonly FilmServise: FilmService) {}

  @Post()
  async create(@Body() film: CreateFilmDto) {
    return await this.FilmServise.create(film);
  }

  @Get()
  async getAll(): Promise<Films[]> {
    return await this.FilmServise.findAll();
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async get(@Query('page') page = 1, @Query('limit') limit = 10): Promise<Films[]> {
    return this.FilmServise.getSeveral(page, limit);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.FilmServise.findOne(id);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() film: UpdateFilmDto) {
    return this.FilmServise.update(id, film);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.FilmServise.delete(id);
  }
}
