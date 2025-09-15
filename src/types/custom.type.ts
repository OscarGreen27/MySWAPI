import { Planets } from 'src/entities/planet/planet.entity';
import { Films } from 'src/entities/film/film.entity';
import { People } from 'src/entities/people/people.entity';
import { Species } from 'src/entities/specie/specie.entity';
import { Starships } from 'src/entities/starship/starship.entity';
import { Vehicles } from 'src/entities/vehicle/vehicle.entity';
import { UpdateFilmDto } from 'src/entities/film/dto/update-film.dto';
import { UpdatePeopleDto } from 'src/entities/people/dto/update-people.dto';
import { UpdatePlanetDto } from 'src/entities/planet/dto/update-planet.dto';
import { UpdateSpecieDto } from 'src/entities/specie/dto/update-specie.dto';
import { UpdateStarshipDto } from 'src/entities/starship/dto/update-starship.dto';
import { UpdateVehicleDto } from 'src/entities/vehicle/dto/update-vehicle.dto';

export type UploadImageHandler = Record<string, (id: number, file: Express.Multer.File) => Promise<boolean | undefined>>;
export type GetImageHandler = Record<string, (id: number) => Promise<People | Films | Planets | Species | Starships | Vehicles | null>>;
export type UpdateImageHandler = Record<
  string,
  (
    id: number,
    entiti: UpdateFilmDto | UpdatePeopleDto | UpdatePlanetDto | UpdateSpecieDto | UpdateStarshipDto | UpdateVehicleDto,
  ) => Promise<People | Films | Planets | Species | Starships | Vehicles | null>
>;
