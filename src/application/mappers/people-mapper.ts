import { People } from '../../domain/entities/people.entity';

export class PeopleMapper {

  toSpanish(people: People): any {
    return {
      nombre: people.name,
      altura: people.height,
      peso: people.mass,
      color_cabello: people.hair_color,
      color_piel: people.skin_color,
      color_ojos: people.eye_color,
      anio_nacimiento: people.birth_year,
      genero: people.gender,
      pueblo_natal: people.homeworld,
      peliculas: people.films,
      especies: people.species,
      vehiculos: people.vehicles,
      naves_espaciales: people.starships,
      creado: people.created,
      editado: people.edited,
      url: people.url
    }
  }
}