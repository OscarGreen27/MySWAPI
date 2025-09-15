import { IsString, MaxLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class CreatePeopleDto {
  @IsString()
  @MaxLength(24)
  name: string;

  @Transform(({ value }: TransformFnParams): string => (/^[0-9]+$/.test(String(value)) ? value : 'unknown'))
  @IsString()
  height: string;

  @Transform(({ value }: TransformFnParams): string => (/^[0-9]+$/.test(String(value)) ? value : 'unknown'))
  @IsString()
  mass: string;

  @IsString()
  @MaxLength(24)
  hair_color: string;

  @IsString()
  @MaxLength(24)
  skin_color: string;

  @IsString()
  @MaxLength(24)
  eye_color: string;

  @IsString()
  @MaxLength(24)
  birth_year: string;

  @IsString()
  @MaxLength(24)
  gender: string;

  @IsString()
  @MaxLength(100)
  homeworld_id: number;
}
