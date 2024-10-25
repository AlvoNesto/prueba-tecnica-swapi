import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { FilmsOldSwapiService } from '../../application/services/films.old-swapi.service';
import { Film } from '../../domain/entities/films.entity';

@Controller('old-swapi/films')
export class FilmsOldSwapiController {
  constructor(private readonly filmService: FilmsOldSwapiService) {}

  @Get()
  async getAllFilms(): Promise<Film[]> {
    return await this.filmService.getAllFilms();
  }

  @Get(':id')
  async getFilmById(@Param('id') id: string): Promise<Film> {
    return await this.filmService.getFilmById(id);
  }
  
}
