import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmsOldSwapiRepository } from '../../infrastructure/repositories/films.old-swapi.repository';
import { Film } from '../../domain/entities/films.entity';

@Injectable()
export class FilmsOldSwapiService {
  constructor(private readonly filmRepository: FilmsOldSwapiRepository) {}

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

}
