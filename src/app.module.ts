import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleModule } from 'src/entities/people/people.module';
import { People } from './entities/people/people.entity';
import { FilmModule } from './entities/film/film.module';
import { Films } from './entities/film/film.entity';
import { PlanetModule } from './entities/planet/planet.module';
import { SpecieModule } from './entities/specie/specie.module';
import { StarshipModule } from './entities/starship/starship.module';
import { VehicleModule } from './entities/vehicle/vehicle.module';
import { Species } from './entities/specie/specie.entity';
import { Starships } from './entities/starship/starship.entity';
import { Vehicles } from './entities/vehicle/vehicle.entity';
import { Planets } from './entities/planet/planet.entity';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
    PeopleModule,
    FilmModule,
    PlanetModule,
    SpecieModule,
    StarshipModule,
    VehicleModule,
    ImagesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 3333,
      username: 'postgres',
      password: '253644',
      database: 'starwars',
      entities: [People, Films, Planets, Species, Starships, Vehicles],
      synchronize: false,
    }),
  ],
})
export class AppModule {}
