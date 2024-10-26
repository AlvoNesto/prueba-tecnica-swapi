import { Film } from '../entities/films.entity';

export interface IFilmsRepository {
  /**
   * Obtiene todas las películas.
   * @returns Una lista de instancias de `Film`.
   */
  getAllSwapiFilms(): Promise<Film[]>;

  /**
   * Obtiene una película por su ID.
   * @param id - El ID de la película.
   * @returns Una instancia de `Film` o `null` si no se encuentra.
   */
  getSwapiFilmById(id: string): Promise<Film>;
  /**
   * Obtiene todas las películas.
   * @returns Una lista de instancias de `Film`.
   */
  getAllDBFilms(): Promise<Film[]>;

  /**
   * Obtiene una película por su ID.
   * @param id - El ID de la película.
   * @returns Una instancia de `Film` o `null` si no se encuentra.
   */
  getDBFilmById(id: string): Promise<Film>;

  /**
   * Crea una nueva película.
   * @param film - Los datos de la película a crear.
   * @returns La película creada.
   */
  createDBFilm(film: Film): Promise<string>;

  /**
   * Actualiza una película existente.
   * @param id - El ID de la película a actualizar.
   * @param film - Los nuevos datos de la película.
   * @returns La película actualizada o `null` si no se encuentra.
   */
  updateDBFilm(id: string, film: Film): Promise<string>;

  /**
   * Elimina una película por su ID.
   * @param id - El ID de la película.
   * @returns Un booleano indicando si la película fue eliminada con éxito.
   */
  deleteDBFilm(id: string): Promise<string>;
}
