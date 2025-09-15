import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinColumn, OneToOne, JoinTable } from 'typeorm';
import { Films } from '../film/film.entity';
import { People } from '../people/people.entity';
import { Planets } from '../planet/planet.entity';

@Entity({ name: 'species', schema: 'species' })
export class Species {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  classification: string;

  @Column()
  designation: string;

  @Column()
  average_height: string;

  @Column()
  hair_colors: string;

  @Column()
  skin_colors: string;

  @Column()
  eye_colors: string;

  @Column()
  average_lifespan: string;

  @Column()
  language: string;

  @Column()
  homeworld_id: number;

  @Column('text', { array: true, nullable: true })
  images: string[];

  @OneToOne(() => Planets)
  @JoinColumn({ name: 'homeworld_id' })
  homeworld: Planets;

  @ManyToMany(() => People, (people) => people.sp)
  @JoinTable({
    schema: 'people',
    name: 'people_species',
    joinColumn: {
      name: 'species_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'person_id',
      referencedColumnName: 'id',
    },
  })
  people: People[];

  @ManyToMany(() => Films, (films) => films.sp)
  @JoinTable({
    schema: 'films',
    name: 'films_species',
    joinColumn: {
      name: 'specie_id',
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
  // @ManyToMany(() => Films, (films) => films.species)
  // f: Films[];

  //people
  @ManyToMany(() => People, (people) => people.species)
  p: People[];
}
