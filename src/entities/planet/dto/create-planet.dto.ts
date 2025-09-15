import { IsNumber, IsNumberString, IsString, MaxLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class CreatePlanetDto {
  @IsString()
  @MaxLength(24)
  name: string;

  @Transform(({ value }: TransformFnParams): string => (/^[0-9]+$/.test(String(value)) ? value : 'unknown'))
  @IsString()
  @MaxLength(7)
  rotation_period: string;

  @Transform(({ value }: TransformFnParams): string => (/^[0-9]+$/.test(String(value)) ? value : 'unknown'))
  @IsString()
  @MaxLength(7)
  orbital_period: string;

  @Transform(({ value }: TransformFnParams): string => (/^[0-9]+$/.test(String(value)) ? value : 'unknown'))
  @IsString()
  @MaxLength(7)
  diameter: string;

  @IsString()
  @MaxLength(24)
  climate: string;

  @IsString()
  @MaxLength(24)
  gravity: string;

  @IsString()
  @MaxLength(24)
  terrain: string;

  @IsNumberString()
  @MaxLength(24)
  surface_water: string;

  @Transform(({ value }: TransformFnParams): string => (/^[0-9]+$/.test(String(value)) ? value : 'unknown'))
  @IsString()
  @MaxLength(10)
  population: string;
}
