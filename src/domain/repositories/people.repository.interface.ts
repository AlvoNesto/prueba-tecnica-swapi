import { People } from '../entities/people.entity';

export interface IPeopleRepository {
  /**
   * Obtiene todas las películas.
   * @returns Una lista de instancias de `People`.
   */
  getAllSwapiPeople(): Promise<People[]>;

  /**
   * Obtiene una película por su ID.
   * @param id - El ID de la película.
   * @returns Una instancia de `People` o `null` si no se encuentra.
   */
  getSwapiPeopleById(id: string): Promise<People>;
  /**
   * Obtiene todas las películas.
   * @returns Una lista de instancias de `People`.
   */
  getAllDBPeople(): Promise<People[]>;

  /**
   * Obtiene una película por su ID.
   * @param id - El ID de la película.
   * @returns Una instancia de `People` o `null` si no se encuentra.
   */
  getDBPeopleById(id: string): Promise<People>;

  /**
   * Crea una nueva película.
   * @param people - Los datos de la película a crear.
   * @returns La película creada.
   */
  createDBPeople(people: People): Promise<string>;

  /**
   * Actualiza una película existente.
   * @param id - El ID de la película a actualizar.
   * @param people - Los nuevos datos de la película.
   * @returns La película actualizada o `null` si no se encuentra.
   */
  updateDBPeople(id: string, people: People): Promise<string>;

  /**
   * Elimina una película por su ID.
   * @param id - El ID de la película.
   * @returns Un booleano indicando si la película fue eliminada con éxito.
   */
  deleteDBPeople(id: string): Promise<string>;
}
