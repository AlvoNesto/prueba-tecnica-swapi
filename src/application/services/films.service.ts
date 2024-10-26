import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmsRepository } from '../../infrastructure/repositories/films.repository';
import { Film } from '../../domain/entities/films.entity';
import { FilmMapper } from '../mappers/film-mapper';
import { FilmDto } from '../../infrastructure/dtos/film.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmRepository: FilmsRepository, private readonly filmMapper: FilmMapper) {}

  async getAllSwapiFilms(): Promise<Film[]> {
    const films = await this.filmRepository.getAllSwapiFilms();
    return films.map(film => this.filmMapper.toSpanish(film))
  }

  async getSwapiFilmById(id: string): Promise<Film> {
    const film = await this.filmRepository.getSwapiFilmById(id);
    if (!film) {
      throw new NotFoundException(`Film with ID ${id} not found`);
    }
    return this.filmMapper.toSpanish(film);
  }

  async getAllDBFilms(): Promise<Film[]> {
    const films = await this.filmRepository.getAllDBFilms();
    return films.map(film => this.filmMapper.toSpanish(film))
  }

  async getDBFilmById(id: string): Promise<Film> {
    const film = await this.filmRepository.getDBFilmById(id);
    if (!film) {
      throw new NotFoundException(`Film with ID ${id} not found`);
    }
    return this.filmMapper.toSpanish(film);
  }

  async createDBFilm(filmDto: FilmDto): Promise<string> {
    const film: Film = new Film(filmDto);
    const id = await this.filmRepository.createDBFilm(film);
    return `Film with ID ${id} was created successfully. Use path GET:'/new/films/${id} to view it.'`;
  }

  async updateDBFilm(id: string, filmDto: FilmDto): Promise<string> {
    const film: Film = new Film(filmDto);
    const existingFilm = await this.filmRepository.getDBFilmById(id);
    if (!existingFilm) {
      throw new NotFoundException(`Film with ID ${id} not found`);
    }
    await this.filmRepository.updateDBFilm(id, film);
    return `Film with ID ${id} was updated successfully. Use path GET:'/new/films/${id} to view it.'`;
  }

  async deleteDBFilm(id: string): Promise<string> {
    const film = await this.filmRepository.getDBFilmById(id);
    if (!film) {
      throw new NotFoundException(`Film with ID ${id} not found`);
    }
    await this.filmRepository.deleteDBFilm(id);
    return `Film with ID ${id} was deleted successfully`
  }
}
