import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { FilmsService } from '../../application/services/films.service';
import { Film } from '../../domain/entities/films.entity';
import { FilmDto } from '../../infrastructure/dtos/film.dto';

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
  @UsePipes(new ValidationPipe({ transform: true }))
  async createFilm(@Body() film: FilmDto): Promise<Film> {
    return await this.filmService.createDBFilm(film);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateFilm(@Param('id') id: string, @Body() film: FilmDto): Promise<Film> {
    return await this.filmService.updateDBFilm(id, film);
  }

  @Delete(':id')
  async deleteFilm(@Param('id') id: string): Promise<void> {
    await this.filmService.deleteDBFilm(id);
  }
}
