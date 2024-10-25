import { Film } from '../entities/films.entity';

export interface IFilmsNewSwapiRepository {
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

  /**
   * Crea una nueva película.
   * @param film - Los datos de la película a crear.
   * @returns La película creada.
   */
  createFilm(film: Film): Promise<Film>;

  /**
   * Actualiza una película existente.
   * @param id - El ID de la película a actualizar.
   * @param film - Los nuevos datos de la película.
   * @returns La película actualizada o `null` si no se encuentra.
   */
  updateFilm(id: string, film: Film): Promise<Film>;

  /**
   * Elimina una película por su ID.
   * @param id - El ID de la película.
   * @returns Un booleano indicando si la película fue eliminada con éxito.
   */
  deleteFilm(id: string): Promise<boolean>;
}
