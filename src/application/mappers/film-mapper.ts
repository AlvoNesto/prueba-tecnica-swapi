import { Film } from '../../domain/entities/films.entity';

export class FilmMapper {

  toSpanish(film: Film): any {
    return {
      titulo: film.title,
      episodio_id: film.episode_id,
      text_apertura: film.opening_crawl,
      director: film.director,
      productor: film.producer,
      personajes: film.characters,
      planetas: film.planets,
      naves_espaciales: film.starships,
      vehiculos: film.vehicles,
      especies: film.species,
      creado: film.created,
      editado: film.edited,
      url: film.url
    }
  }
}