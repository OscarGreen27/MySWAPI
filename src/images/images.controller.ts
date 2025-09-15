import { Controller, UseInterceptors, UploadedFile, Post, Param, NotFoundException, Get, ParseIntPipe, Res, Delete } from '@nestjs/common';

import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { Response } from 'express';

import { PeopleService } from 'src/entities/people/people.service';
import { FilmService } from 'src/entities/film/film.service';
import { PlanetService } from 'src/entities/planet/planet.service';
import { SpecieService } from 'src/entities/specie/specie.service';
import { StarshipService } from 'src/entities/starship/starship.service';
import { VehicleService } from 'src/entities/vehicle/vehicle.service';

import { UploadImageHandler, GetImageHandler, UpdateImageHandler } from 'src/types/custom.type';

@Controller('images')
export class ImagesController {
  readonly entities: {
    upload: UploadImageHandler;
    getOne: GetImageHandler;
    update: UpdateImageHandler;
  };
  constructor(
    private readonly peopleService: PeopleService,
    private readonly filmService: FilmService,
    private readonly planetService: PlanetService,
    private readonly specieService: SpecieService,
    private readonly starshipService: StarshipService,
    private readonly vehicleService: VehicleService,
  ) {
    this.entities = {
      upload: {
        film: this.filmService.saveImage.bind(this.filmService),
        people: this.peopleService.saveImage.bind(this.peopleService),
        planet: this.planetService.saveImage.bind(this.planetService),
        specie: this.specieService.saveImage.bind(this.specieService),
        starship: this.starshipService.saveImageName.bind(this.starshipService),
        vehicle: this.vehicleService.saveImageName.bind(this.vehicleService),
      },
      getOne: {
        film: this.filmService.findOne.bind(this.filmService),
        people: this.peopleService.findOne.bind(this.peopleService),
        planet: this.planetService.findOne.bind(this.planetService),
        specie: this.specieService.findOne.bind(this.specieService),
        starship: this.starshipService.findOne.bind(this.starshipService),
        vehicle: this.vehicleService.findOne.bind(this.vehicleService),
      },
      update: {
        film: this.filmService.update.bind(this.filmService),
        people: this.peopleService.update.bind(this.peopleService),
        planet: this.planetService.update.bind(this.planetService),
        specie: this.specieService.update.bind(this.specieService),
        starship: this.starshipService.update.bind(this.starshipService),
        vehicle: this.vehicleService.update.bind(this.vehicleService),
      },
    };
  }

  @Post('/upload/:type/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const id = Number(req.params['id']);
          const type = req.params['type'];
          if (isNaN(id)) {
            throw new Error('Id is invalid!');
          }
          const uploadPath = path.join(process.cwd(), 'uploads', `${type}`, `${id}`);

          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
          }

          callback(null, uploadPath);
        },
        filename: (req, file, callback) => {
          const splitedOriginslName = file.originalname.split('.');

          const newName = `${Date.now()}_${Math.floor(Math.random() * 1e6)}.${splitedOriginslName[1]}`;
          callback(null, newName);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadImage(@Param('id') id: number, @Param('type') type: string, @UploadedFile() file: Express.Multer.File) {
    if (!(type in this.entities.upload)) throw new NotFoundException();

    const updateResult = await this.entities.upload[type](id, file);
    if (updateResult) {
      return JSON.stringify({ ok: true });
    }
    return JSON.stringify({ ok: false });
  }

  @Get('/:type/:id')
  async getImages(@Param('id', ParseIntPipe) id: number, @Param('type') type: string) {
    const entity = await this.entities.getOne[type](id);
    if (!entity) throw new NotFoundException();

    const images = entity.images;

    if (!images) throw new NotFoundException();

    return images;
  }

  @Get('/:type/:id/:fileName')
  async getImage(@Param('id', ParseIntPipe) id: number, @Param('type') type: string, @Param('fileName') fileName: string, @Res() res: Response) {
    if (!(type in this.entities.getOne)) throw new NotFoundException('Invalid type entiti!');

    const entity = await this.entities.getOne[type](id);
    if (!entity) throw new NotFoundException();

    const filePath = path.join(process.cwd(), `uploads/${type}/${id}/${fileName}`);
    res.sendFile(filePath);
  }

  @Delete('/delete/:type/:id/:fileName')
  async deleteImage(@Param('id', ParseIntPipe) id: number, @Param('type') type: string, @Param('fileName') fileName: string) {
    if (!(type in this.entities.getOne)) throw new NotFoundException('Invalid type entiti!');
    const entity = await this.entities.getOne[type](id);

    if (!entity) throw new NotFoundException(`The ${type} from the ${id} was not found.`);

    if (!entity.images.includes(fileName)) throw new NotFoundException(`${fileName} does not belong to the ${type} with ID: ${id}`);
    entity.images = entity.images.filter((img) => {
      if (img !== fileName) return img;
    });

    await this.entities.update[type](id, entity);

    fs.unlink(path.join(process.cwd(), 'uploads', `${type}`, String(id), fileName), (err) => {
      if (err) throw err;
      console.log(`File: ${fileName} was deleted!`);
    });
  }
}
