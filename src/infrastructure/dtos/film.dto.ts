import { IsString, IsNotEmpty, IsInt, IsArray, IsDateString, IsOptional, IsUrl } from 'class-validator';

export class FilmDto {

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsInt()
  @IsNotEmpty()
  episode_id: number;

  @IsString()
  @IsNotEmpty()
  opening_crawl: string;

  @IsString()
  @IsNotEmpty()
  director: string;

  @IsString()
  @IsNotEmpty()
  producer: string;

  @IsDateString()
  @IsNotEmpty()
  release_date: string;

  @IsArray()
  @IsString({ each: true })
  characters: string[];

  @IsArray()
  @IsString({ each: true })
  planets: string[];

  @IsArray()
  @IsString({ each: true })
  starships: string[];

  @IsArray()
  @IsString({ each: true })
  vehicles: string[];

  @IsArray()
  @IsString({ each: true })
  species: string[];

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
