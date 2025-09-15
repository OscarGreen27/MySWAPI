import { Transform, TransformFnParams } from 'class-transformer';
import { IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateSpecieDto {
  @IsString()
  @MaxLength(24)
  name: string;

  @IsString()
  @MaxLength(24)
  classification: string;

  @IsString()
  @MaxLength(24)
  designation: string;

  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsString()
  @MaxLength(24)
  average_height: string;

  @IsString()
  @MaxLength(50)
  skin_colors: string;

  @IsString()
  @MaxLength(24)
  hair_colors: string;

  @IsString()
  @MaxLength(24)
  eye_colors: string;

  @Transform(({ value }: TransformFnParams): string => {
    return /^[0-9]+$/.test(String(value)) ? value : 'unknown';
  })
  @IsString()
  average_lifespan: string;

  @IsString()
  @MaxLength(24)
  language: string;

  @IsNumber()
  homeworld_id: number;
}
