import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicles } from './vehicle.entity';
import { Repository } from 'typeorm';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(@InjectRepository(Vehicles) private VehicleRepository: Repository<Vehicles>) {}

  async getSeveral(page: number, limit: number): Promise<Vehicles[]> {
    const skip = (page - 1) * limit;
    return await this.VehicleRepository.find({
      skip: skip,
      take: limit,
      order: { id: 'ASC' },
      relations: ['pilotes', 'films'],
    });
  }

  async findAll(): Promise<Vehicles[]> {
    return await this.VehicleRepository.find({ relations: ['pilotes', 'films'] });
  }

  async findOne(id: number): Promise<Vehicles | null> {
    return await this.VehicleRepository.findOne({ where: { id }, relations: ['pilotes', 'films'] });
  }

  async create(vehicle: CreateVehicleDto): Promise<Vehicles> {
    const newVehicleEntity: Vehicles = this.VehicleRepository.create({
      ...vehicle,
      images: [],
    });

    return await this.VehicleRepository.save(newVehicleEntity);
  }
  async update(id: number, updateDto: UpdateVehicleDto): Promise<Vehicles | null> {
    const existing = await this.VehicleRepository.findOneBy({ id });
    if (!existing) return null;

    const update = {
      ...existing,
      ...updateDto,
    };

    return await this.VehicleRepository.save(update);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.VehicleRepository.delete(id);
    return result.affected !== 0;
  }

  async saveImageName(id: number, file: Express.Multer.File) {
    const vehicle = await this.VehicleRepository.findOneBy({ id });
    if (!vehicle) {
      throw new Error('Id is not exist!');
    }

    vehicle.images.push(file.filename);

    const result = await this.VehicleRepository.update(id, vehicle);

    if (result.affected) {
      return result.affected > 0;
    }
  }
}
