import { Body, Controller, Post, Get, Put, Delete, ParseIntPipe, Param, ValidationPipe, Query } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Vehicles } from './vehicle.entity';

@ApiTags('Vehicles')
@Controller('vehicles')
export class VehicleController {
  constructor(private readonly VehicleServise: VehicleService) {}

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async get(@Query('page') page = 1, @Query('limit') limit = 10): Promise<Vehicles[]> {
    return this.VehicleServise.getSeveral(page, limit);
  }

  @Get()
  async getAll(): Promise<Vehicles[]> {
    return this.VehicleServise.findAll();
  }

  @Post()
  async create(@Body() vehicle: CreateVehicleDto) {
    return await this.VehicleServise.create(vehicle);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.VehicleServise.findOne(id);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body(new ValidationPipe()) vehicle: UpdateVehicleDto) {
    return this.VehicleServise.update(id, vehicle);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.VehicleServise.delete(id);
  }
}
