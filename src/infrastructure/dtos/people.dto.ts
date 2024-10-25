import { IsString, IsNotEmpty, IsInt, IsArray, IsOptional, IsUrl, IsDateString } from 'class-validator';

export class PeopleDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  height: string;

  @IsString()
  @IsNotEmpty()
  mass: string;

  @IsString()
  @IsNotEmpty()
  hair_color: string;

  @IsString()
  @IsNotEmpty()
  skin_color: string;

  @IsInt()
  @IsNotEmpty()
  eye_color: number;

  @IsString()
  @IsNotEmpty()
  birth_year: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  homeworld: string;

  @IsArray()
  @IsString({ each: true })
  films: string[];

  @IsArray()
  @IsString({ each: true })
  species: string[];

  @IsArray()
  @IsString({ each: true })
  vehicles: string[];

  @IsArray()
  @IsString({ each: true })
  starships: string[];

  @IsDateString()
  @IsOptional()
  created?: string;

  @IsDateString()
  @IsOptional()
  edited?: string;

  @IsUrl()
  @IsNotEmpty()
  url: string;
}
