import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Starships } from './starship.entity';
import { Repository } from 'typeorm';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';

@Injectable()
export class StarshipService {
  constructor(
    @InjectRepository(Starships)
    private StarshipRepository: Repository<Starships>,
  ) {}

  async getSeveral(page: number, limit: number): Promise<Starships[]> {
    const skip = (page - 1) * limit;
    return await this.StarshipRepository.find({
      skip: skip,
      take: limit,
      order: { id: 'ASC' },
      relations: ['films', 'pilotes'],
    });
  }

  async findAll(): Promise<Starships[]> {
    return await this.StarshipRepository.find({ relations: ['films', 'pilotes'] });
  }

  async findOne(id: number): Promise<Starships | null> {
    return await this.StarshipRepository.findOne({ where: { id }, relations: ['films', 'pilotes'] });
  }

  async create(starship: CreateStarshipDto): Promise<Starships> {
    const newStarshipEntry = this.StarshipRepository.create({
      ...starship,
      images: [],
    });
    return await this.StarshipRepository.save(newStarshipEntry);
  }

  async update(id: number, updateDto: UpdateStarshipDto): Promise<Starships | null> {
    const existing = await this.StarshipRepository.findOneBy({ id });
    if (!existing) return null;

    const update = {
      ...existing,
      ...updateDto,
    };

    return await this.StarshipRepository.save(update);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.StarshipRepository.delete(id);
    return result.affected !== 0;
  }

  async saveImageName(id: number, file: Express.Multer.File) {
    const starship = await this.StarshipRepository.findOneBy({ id });
    if (!starship) {
      throw new Error('Id is not exist!');
    }

    starship.images.push(file.filename);

    const result = await this.StarshipRepository.update(id, starship);

    if (result.affected) {
      return result.affected > 0;
    }
  }
}
