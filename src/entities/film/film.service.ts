import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Films } from './film.entity';
import { Repository } from 'typeorm';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';

@Injectable()
export class FilmService {
  constructor(@InjectRepository(Films) private FilmRepository: Repository<Films>) {}

  async create(film: CreateFilmDto) {
    const newFilm = this.FilmRepository.create(film);
    await this.FilmRepository.save(newFilm);
  }

  async getSeveral(page: number, limit: number): Promise<Films[]> {
    const skip = (page - 1) * limit;
    return await this.FilmRepository.find({
      skip: skip,
      take: limit,
      order: { id: 'ASC' },
      relations: ['planets', 'species', 'starships', 'vehicles', 'characters'],
    });
  }

  async findAll(): Promise<Films[]> {
    return await this.FilmRepository.find({ relations: ['planets', 'species', 'starships', 'vehicles', 'characters'] });
  }

  //'planets', 'species', 'starships', 'vehicles',
  async findOne(id: number): Promise<Films | null> {
    const result = await this.FilmRepository.findOne({ where: { id }, relations: ['characters'] });
    return result;
  }

  async update(id: number, updateDto: UpdateFilmDto): Promise<Films | null> {
    const existing = await this.FilmRepository.findOneBy({ id });
    if (!existing) return null;

    const update = {
      ...existing,
      ...updateDto,
    };

    return await this.FilmRepository.save(update);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.FilmRepository.delete(id);
    return result.affected !== 0;
  }

  async saveImage(id: number, file: Express.Multer.File) {
    const film = await this.FilmRepository.findOneBy({ id });
    if (!film) {
      throw new Error('Id is not exist!');
    }

    film.images.push(file.filename);

    const result = await this.FilmRepository.update(id, film);

    if (result.affected) {
      return result.affected > 0;
    }
  }
}
