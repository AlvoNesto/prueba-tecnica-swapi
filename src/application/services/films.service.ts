import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmsRepository } from '../../infrastructure/repositories/films.repository';
import { Film } from '../../domain/entities/films.entity';

@Injectable()
export class FilmsService {
  constructor(private readonly filmRepository: FilmsRepository) {}

  async getAllSwapiFilms(): Promise<Film[]> {
    return await this.filmRepository.getAllSwapiFilms();
  }

  async getSwapiFilmById(id: string): Promise<Film> {
    const film = await this.filmRepository.getSwapiFilmById(id);
    if (!film) {
      throw new NotFoundException(`Film with ID ${id} not found`);
    }
    return film;
  }

  async getAllDBFilms(): Promise<Film[]> {
    return await this.filmRepository.getAllDBFilms();
  }

  async getDBFilmById(id: string): Promise<Film> {
    const film = await this.filmRepository.getDBFilmById(id);
    if (!film) {
      throw new NotFoundException(`Film with ID ${id} not found`);
    }
    return film;
  }

  async createDBFilm(film: Film): Promise<Film> {
    // Aquí podrías agregar validaciones o lógica de negocio
    return await this.filmRepository.createDBFilm(film);
  }

  async updateDBFilm(id: string, film: Film): Promise<Film> {
    const existingFilm = await this.filmRepository.getDBFilmById(id);
    if (!existingFilm) {
      throw new NotFoundException(`Film with ID ${id} not found`);
    }
    return await this.filmRepository.updateDBFilm(id, film);
  }

  async deleteDBFilm(id: string): Promise<void> {
    const film = await this.filmRepository.getDBFilmById(id);
    if (!film) {
      throw new NotFoundException(`Film with ID ${id} not found`);
    }
    await this.filmRepository.deleteDBFilm(id);
  }
}
