import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Films } from '../film/film.entity';
import { People } from '../people/people.entity';

@Entity({ name: 'vehicles', schema: 'vehicles' })
export class Vehicles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  model: string;

  @Column()
  manufacturer: string;

  @Column()
  cost_in_credits: string;

  @Column()
  length: string;

  @Column()
  max_atmosphering_speed: string;

  @Column()
  crew: string;

  @Column()
  passengers: string;

  @Column()
  cargo_capacity: string;

  @Column()
  consumables: string;

  @Column()
  vehicle_class: string;

  @Column('text', { array: true, nullable: true })
  images: string[];

  @ManyToMany(() => People, (people) => people.veh)
  @JoinTable({
    schema: 'people',
    name: 'people_vehicles',
    joinColumn: {
      name: 'vehicle_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'person_id',
      referencedColumnName: 'id',
    },
  })
  pilotes: People[];

  @ManyToMany(() => Films, (films) => films.veh)
  @JoinTable({
    schema: 'films',
    name: 'films_vehicles',
    joinColumn: {
      name: 'vehicle_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'film_id',
      referencedColumnName: 'id',
    },
  })
  films: Films[];

  //зворотні зв'язки
  //films
  // @ManyToMany(() => Films, (film) => film.vehicles)
  // f: Films[];

  //people
  @ManyToMany(() => People, (people) => people.vehicles)
  p: People[];
}
