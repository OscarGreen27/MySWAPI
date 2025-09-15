import { Injectable } from '@nestjs/common';
import { People } from 'src/entities/people/people.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePeopleDto } from './dto/create-people.dto';
import { UpdatePeopleDto } from './dto/update-people.dto';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(People)
    private PeopleRepository: Repository<People>,
  ) {}

  async getSeveral(page: number, limit: number): Promise<People[]> {
    const skip = (page - 1) * limit;
    return await this.PeopleRepository.find({
      skip: skip,
      take: limit,
      order: { id: 'ASC' },
      relations: ['homeworld', 'films', 'species', 'vehicles', 'starships'],
    });
  }

  async create(persone: CreatePeopleDto): Promise<People> {
    const newPersonEntity = this.PeopleRepository.create({
      ...persone,
      images: [],
    });
    return await this.PeopleRepository.save(newPersonEntity);
  }

  async findAll(): Promise<People[]> {
    return await this.PeopleRepository.find({ relations: ['homeworld', 'films', 'species', 'vehicles', 'starships'] });
  }
  async findOne(id: number): Promise<People | null> {
    return await this.PeopleRepository.findOne({ where: { id }, relations: ['films', 'homeworld', 'species', 'vehicles', 'starships'] });
  }

  async update(id: number, updateDto: UpdatePeopleDto): Promise<People | null> {
    const existing = await this.PeopleRepository.findOneBy({ id });
    if (!existing) return null;
    console.log(existing);
    const updated = {
      ...existing,
      ...updateDto,
    };
    console.log(updated);

    return await this.PeopleRepository.save(updated);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.PeopleRepository.delete(id);
    return result.affected !== 0;
  }

  async saveImage(id: number, file: Express.Multer.File) {
    const persone = await this.PeopleRepository.findOneBy({ id });
    if (!persone) {
      throw new Error('Id is not exist!');
    }

    persone.images.push(file.filename);

    const result = await this.PeopleRepository.update(id, persone);

    if (result.affected) {
      return result.affected > 0;
    }
  }
}
