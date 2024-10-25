import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { FilmsService } from '../../application/services/films.service';
import { Film } from '../../domain/entities/films.entity';

@Controller('old/films')
export class OldFilmsController {
  constructor(private readonly filmService: FilmsService) {}

  @Get()
  async getAllSwapiFilms(): Promise<Film[]> {
    return await this.filmService.getAllSwapiFilms();
  }

  @Get(':id')
  async getSwapiFilmById(@Param('id') id: string): Promise<Film> {
    return await this.filmService.getSwapiFilmById(id);
  }
  
}
