import { Body, Controller, Post, Get, ParseIntPipe, Param, Put, Delete, NotFoundException, Query } from '@nestjs/common';
import { PeopleService } from './people.service';
import { People } from './people.entity';
import { CreatePeopleDto } from './dto/create-people.dto';
import { UpdatePeopleDto } from './dto/update-people.dto';

import { ApiTags, ApiQuery } from '@nestjs/swagger';
import * as path from 'path';
import * as fs from 'fs';

@ApiTags('People')
@Controller('people')
export class PeopleController {
  constructor(private readonly PeopleService: PeopleService) {}

  @Post()
  async create(@Body() persone: CreatePeopleDto) {
    return await this.PeopleService.create(persone);
  }

  @Get()
  async getAll(): Promise<People[]> {
    return await this.PeopleService.findAll();
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async get(@Query('page') page = 1, @Query('limit') limit = 10): Promise<People[]> {
    return this.PeopleService.getSeveral(page, limit);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<People> {
    const result = await this.PeopleService.findOne(id);

    if (!result) throw new NotFoundException(`The Persone from the ${id} was not found.`);

    return result;
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() persone: UpdatePeopleDto) {
    const result = await this.PeopleService.update(id, persone);

    if (!result) throw new NotFoundException(`Not updated. The Person from the ${id} was not found.`);

    return result;
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    fs.rm(path.join(process.cwd(), 'uploads', 'people', `${String(id)}`), { recursive: true, force: true }, (err) => {
      if (err) console.log(err);
    });
    return await this.PeopleService.delete(id);
  }
}
