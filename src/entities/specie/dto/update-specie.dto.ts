import { Transform, TransformFnParams } from 'class-transformer';
import { IsOptional, IsString, MaxLength, IsNumber } from 'class-validator';

export class UpdateSpecieDto {
  @IsOptional()
  @IsString()
  @MaxLength(24)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(24)
  classification: string;

  @IsOptional()
  @IsString()
  @MaxLength(24)
  designation: string;

  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsOptional()
  @IsString()
  @MaxLength(24)
  average_height: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  skin_colors: string;

  @IsOptional()
  @IsString()
  @MaxLength(24)
  hair_colors: string;

  @IsOptional()
  @IsString()
  @MaxLength(24)
  eye_colors: string;

  @IsOptional()
  @IsString()
  @MaxLength(24)
  average_lifespan: string;

  @IsOptional()
  @IsString()
  @MaxLength(24)
  language: string;

  @IsOptional()
  @IsNumber()
  homeworld_id: number;
}
