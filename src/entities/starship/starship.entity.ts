import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Films } from '../film/film.entity';
import { People } from '../people/people.entity';

@Entity({ name: 'starships', schema: 'starships' })
export class Starships {
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
  hyperdrive_rating: string;

  @Column()
  mglt: string;

  @Column()
  starship_class: string;

  @Column('text', { array: true, nullable: true })
  images: string[];

  @ManyToMany(() => People, (people) => people.st)
  @JoinTable({
    schema: 'people',
    name: 'people_starships',
    joinColumn: {
      name: 'starship_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'person_id',
      referencedColumnName: 'id',
    },
  })
  pilotes: People[];

  @ManyToMany(() => Films, (films) => films.st)
  @JoinTable({
    schema: 'films',
    name: 'films_starships',
    joinColumn: {
      name: 'starship_id',
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
  // @ManyToMany(() => Films, (films) => films.starships)
  // f: Starships[];

  //people
  @ManyToMany(() => People, (people) => people.starships)
  p: People[];
}
