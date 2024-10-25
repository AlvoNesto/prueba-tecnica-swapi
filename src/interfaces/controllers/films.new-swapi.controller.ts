import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { FilmsNewSwapiService } from '../../application/services/films.new-swapi.service';
import { Film } from '../../domain/entities/films.entity';

@Controller('new-swapi/films')
export class FilmsNewSwapiController {
  constructor(private readonly filmService: FilmsNewSwapiService) {}

  @Get()
  async getAllFilms(): Promise<Film[]> {
    return await this.filmService.getAllFilms();
  }

  @Get(':id')
  async getFilmById(@Param('id') id: string): Promise<Film> {
    return await this.filmService.getFilmById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createFilm(@Body() film: Film): Promise<Film> {
    return await this.filmService.createFilm(film);
  }

  @Put(':id')
  async updateFilm(@Param('id') id: string, @Body() film: Film): Promise<Film> {
    return await this.filmService.updateFilm(id, film);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFilm(@Param('id') id: string): Promise<void> {
    await this.filmService.deleteFilm(id);
  }
}
