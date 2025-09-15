import { IsString, IsOptional, MaxLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class UpdateVehicleDto {
  @IsOptional()
  @IsString()
  @MaxLength(24)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(24)
  model: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  manufacturer: string;

  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsOptional()
  @IsString()
  @MaxLength(15)
  cost_in_credits: string;

  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  length: string;

  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  max_atmosphering_speed: string;

  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  crew: string;

  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  passengers: string;

  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsString()
  @MaxLength(24)
  cargo_capacity: string;

  @IsOptional()
  @IsString()
  @MaxLength(24)
  consumables: string;

  @IsOptional()
  @IsString()
  @MaxLength(24)
  vehicle_class: string;
}
