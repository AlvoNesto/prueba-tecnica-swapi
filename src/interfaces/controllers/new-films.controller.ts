import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { FilmsService } from '../../application/services/films.service';
import { Film } from '../../domain/entities/films.entity';

@Controller('new/films')
export class NewFilmsController {
  constructor(private readonly filmService: FilmsService) {}

  @Get()
  async getAllFilms(): Promise<Film[]> {
    return await this.filmService.getAllDBFilms();
  }

  @Get(':id')
  async getFilmById(@Param('id') id: string): Promise<Film> {
    return await this.filmService.getDBFilmById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createFilm(@Body() film: Film): Promise<Film> {
    return await this.filmService.createDBFilm(film);
  }

  @Put(':id')
  async updateFilm(@Param('id') id: string, @Body() film: Film): Promise<Film> {
    return await this.filmService.updateDBFilm(id, film);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteFilm(@Param('id') id: string): Promise<void> {
    await this.filmService.deleteDBFilm(id);
  }
}
