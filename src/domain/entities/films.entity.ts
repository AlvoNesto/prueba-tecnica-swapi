export class Film {
    id: string;           // Identificador único (Primary Key en DynamoDB)
    title: string;        // Título de la película
    director: string;     // Director de la película
    producer: string;     // Productor de la película
    releaseDate: string;  // Fecha de lanzamiento
    episodeId: number;    // Número de episodio
    openingCrawl: string; // Introducción
    createdAt: string;    // Fecha de creación del registro
    updatedAt: string;    // Fecha de última actualización
  
    constructor(partial: Partial<Film>) {
      Object.assign(this, partial);
    }
  }
  