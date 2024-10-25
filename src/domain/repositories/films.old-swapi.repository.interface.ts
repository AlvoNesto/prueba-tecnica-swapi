import { Film } from '../entities/films.entity';

export interface IFilmsOldSwapiRepository {
  /**
   * Obtiene todas las películas.
   * @returns Una lista de instancias de `Film`.
   */
  getAllFilms(): Promise<Film[]>;

  /**
   * Obtiene una película por su ID.
   * @param id - El ID de la película.
   * @returns Una instancia de `Film` o `null` si no se encuentra.
   */
  getFilmById(id: string): Promise<Film>;
}
