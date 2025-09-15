import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Species } from './specie.entity';
import { Repository } from 'typeorm';
import { CreateSpecieDto } from './dto/create-specie.dto';
import { UpdateSpecieDto } from './dto/update-specie.dto';

@Injectable()
export class SpecieService {
  constructor(@InjectRepository(Species) private SpecieRepository: Repository<Species>) {}
  async getSeveral(page: number, limit: number): Promise<Species[]> {
    const skip = (page - 1) * limit;
    return await this.SpecieRepository.find({
      skip: skip,
      take: limit,
      order: { id: 'ASC' },
      relations: ['homeworld', 'people', 'films'],
    });
  }

  async findAll(): Promise<Species[]> {
    return await this.SpecieRepository.find({ relations: ['homeworld', 'people', 'films'] });
  }

  async findOne(id: number): Promise<Species | null> {
    return await this.SpecieRepository.findOne({ where: { id }, relations: ['homeworld', 'people', 'films'] });
  }

  async create(specie: CreateSpecieDto): Promise<Species> {
    const newSpecieEntity = this.SpecieRepository.create({
      ...specie,
      images: [],
    });
    return await this.SpecieRepository.save(newSpecieEntity);
  }

  async update(id: number, updateDto: UpdateSpecieDto): Promise<Species | null> {
    const existing = await this.SpecieRepository.findOneBy({ id });
    if (!existing) return null;

    const update = {
      ...existing,
      ...updateDto,
    };

    return await this.SpecieRepository.save(update);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.SpecieRepository.delete(id);
    return result.affected !== 0;
  }

  async saveImage(id: number, file: Express.Multer.File) {
    const specie = await this.SpecieRepository.findOneBy({ id });
    if (!specie) {
      throw new Error('Id is not exist!');
    }

    specie.images.push(file.filename);

    const result = await this.SpecieRepository.update(id, specie);

    if (result.affected) {
      return result.affected > 0;
    }
  }
}
