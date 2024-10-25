import { Injectable } from '@nestjs/common';
import { IFilmsOldSwapiRepository } from '../../domain/repositories/films.old-swapi.repository.interface';
import { Film } from '../../domain/entities/films.entity';
import { URL } from '../database/swapi.config';
import fetch from 'node-fetch';

@Injectable()
export class FilmsOldSwapiRepository implements IFilmsOldSwapiRepository {

  async getAllFilms(): Promise<Film[]> {
    const response = await fetch(`${URL}/films`);
    const data = await response.json();
    console.log(data);
    return data.results.map(item => new Film(item));
  }

  async getFilmById(id: string): Promise<Film> {
    const response = await fetch(`${URL}/films/${id}`);
    const data = await response.json();
    return new Film(data);
  }

}
