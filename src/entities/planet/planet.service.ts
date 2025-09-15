import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Planets } from './planet.entity';
import { Repository } from 'typeorm';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { CreatePlanetDto } from './dto/create-planet.dto';

@Injectable()
export class PlanetService {
  constructor(@InjectRepository(Planets) private PlanetRepository: Repository<Planets>) {}

  async getSeveral(page: number, limit: number): Promise<Planets[]> {
    const skip = (page - 1) * limit;
    return await this.PlanetRepository.find({
      skip: skip,
      take: limit,
      order: { id: 'ASC' },
      relations: ['residents', 'films'],
    });
  }

  async findAll(): Promise<Planets[]> {
    return await this.PlanetRepository.find({ relations: ['residents', 'films'] });
  }

  async findOne(id: number): Promise<Planets | null> {
    return await this.PlanetRepository.findOne({ where: { id }, relations: ['residents', 'films'] });
  }

  async create(planet: CreatePlanetDto): Promise<Planets> {
    const newPlanetEntity = this.PlanetRepository.create({
      ...planet,
      images: [],
    });
    return await this.PlanetRepository.save(newPlanetEntity);
  }

  async update(id: number, updateDto: UpdatePlanetDto): Promise<Planets | null> {
    const existing = await this.PlanetRepository.findOneBy({ id });
    if (!existing) return null;

    const update = {
      ...existing,
      ...updateDto,
    };

    return await this.PlanetRepository.save(update);
  }

  async delete(id: number) {
    const result = await this.PlanetRepository.delete(id);
    return result.affected !== 0;
  }

  async saveImage(id: number, file: Express.Multer.File) {
    const planet = await this.PlanetRepository.findOneBy({ id });
    if (!planet) {
      throw new Error('Id is not exist!');
    }

    planet.images.push(file.filename);

    const result = await this.PlanetRepository.update(id, planet);

    if (result.affected) {
      return result.affected > 0;
    }
  }
}
