import { IsString, MaxLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class CreateStarshipDto {
  @IsString()
  @MaxLength(24)
  name: string;

  @IsString()
  @MaxLength(50)
  model: string;

  @IsString()
  @MaxLength(100)
  manufacturer: string;

  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsString()
  @MaxLength(15)
  cost_in_credits: string;

  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsString()
  length: string;

  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsString()
  max_atmosphering_speed: string;

  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsString()
  crew: string;

  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsString()
  passengers: string;

  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsString()
  cargo_capacity: string;

  @IsString()
  @MaxLength(24)
  consumables: string;

  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsString()
  hyperdrive_rating: string;

  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsString()
  mglt: string;

  @IsString()
  @MaxLength(50)
  starship_class: string;
}
