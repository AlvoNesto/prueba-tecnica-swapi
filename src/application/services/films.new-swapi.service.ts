import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmsNewSwapiRepository } from '../../infrastructure/repositories/films.new-swapi.repository';
import { Film } from '../../domain/entities/films.entity';

@Injectable()
export class FilmsNewSwapiService {
  constructor(private readonly filmRepository: FilmsNewSwapiRepository) {}

  async getAllFilms(): Promise<Film[]> {
    return await this.filmRepository.getAllFilms();
  }

  async getFilmById(id: string): Promise<Film> {
    const film = await this.filmRepository.getFilmById(id);
    if (!film) {
      throw new NotFoundException(`Film with ID ${id} not found`);
    }
    return film;
  }

  async createFilm(film: Film): Promise<Film> {
    // Aquí podrías agregar validaciones o lógica de negocio
    return await this.filmRepository.createFilm(film);
  }

  async updateFilm(id: string, film: Film): Promise<Film> {
    const existingFilm = await this.filmRepository.getFilmById(id);
    if (!existingFilm) {
      throw new NotFoundException(`Film with ID ${id} not found`);
    }
    return await this.filmRepository.updateFilm(id, film);
  }

  async deleteFilm(id: string): Promise<void> {
    const film = await this.filmRepository.getFilmById(id);
    if (!film) {
      throw new NotFoundException(`Film with ID ${id} not found`);
    }
    await this.filmRepository.deleteFilm(id);
  }
}
