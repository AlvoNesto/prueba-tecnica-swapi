import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import { IFilmsRepository } from '../../domain/repositories/films.repository.interface';
import { Film } from '../../domain/entities/films.entity';
import { URL } from '../database/swapi.config';

@Injectable()
export class FilmsRepository implements IFilmsRepository {
  private dynamoDb: DynamoDB.DocumentClient;
  private starWarsTableName: string = process.env.STAR_WARS_TABLE;
  private counterTableName: string = process.env.COUNTER_TABLE;

  constructor() {
    this.dynamoDb = new DynamoDB.DocumentClient();
  }

  async getAllSwapiFilms(): Promise<Film[]> {
    let response = await fetch(`${URL}/films`);
    let currentData = await response.json();
    let totalData = [];
    while (currentData.next) {
        totalData = totalData.concat(currentData.results);
        response = await fetch(currentData.next);
        currentData = await response.json();
    }
    totalData = totalData.concat(currentData.results);
    return totalData.map(item => new Film(item));
  }

  async getSwapiFilmById(id: string): Promise<Film> {
    const response = await fetch(`${URL}/films/${id}`);
    const data = await response.json();
    return new Film(data);
  }

  async getAllDBFilms(): Promise<Film[] | null> {
    const params = {
      TableName: this.starWarsTableName,
      IndexName: "EntidadIndex",
      KeyConditionExpression: "#entidad = :entidadValue",
      ExpressionAttributeNames: {
        "#entidad": "entidad",
      },
      ExpressionAttributeValues: {
        ":entidadValue": "film",
      },
    };
    const result = await this.dynamoDb.query(params).promise();
    return result.Items.length > 0 ? result.Items.map(item => new Film(item)) : null;
  }

  async getDBFilmById(id: string): Promise<Film | null> {
    const params = {
        TableName: this.starWarsTableName,
        Key: {
            id: id,
            entidad: "film"
        }
    };
    const result = await this.dynamoDb.get(params).promise();
    return result.Item ? new Film(result.Item) : null;
}
  async createDBFilm(film: Film): Promise<Film> {
    film.id = await this.getNextId();
    film.entidad = "film";
    const params = {
      TableName: this.starWarsTableName,
      Item: film,
    };
    console.log("NEW FILM", params);
    await this.dynamoDb.put(params).promise();
    return film;
  }

  async updateDBFilm(id: string, film: Film): Promise<Film> {
    const params = {
      TableName: this.starWarsTableName,
      Key: { id, entidad: "film" },
      UpdateExpression: 'set #title = :title, #episode_id = :episode_id, #opening_crawl = :opening_crawl, #director = :director, #producer = :producer, #release_date = :release_date, #characters = :characters, #planets = :planets, #starships = :starships, #vehicles = :vehicles, #species = :species, #created = :created, #updatedAt = :updatedAt, #url = :url',
      ExpressionAttributeNames: {
        '#title': 'title',
        '#episode_id': 'episode_id',
        '#opening_crawl': 'opening_crawl',
        '#director': 'director',
        '#producer': 'producer',
        '#release_date': 'release_date',
        '#characters': 'characters',
        '#planets': 'planets',
        '#starships': 'starships',
        '#vehicles': 'vehicles',
        '#species': 'species',
        '#created': 'created',
        '#updatedAt': 'updatedAt',
        '#url': 'url'
      },
      ExpressionAttributeValues: {
        ':title': film.title,
        ':episode_id': film.episode_id,
        ':opening_crawl': film.opening_crawl,
        ':director': film.director,
        ':producer': film.producer,
        ':release_date': film.release_date,
        ':characters': film.characters,
        ':planets': film.planets,
        ':starships': film.starships,
        ':vehicles': film.vehicles,
        ':species': film.species,
        ':created': film.created,
        ':updatedAt': new Date().toISOString(),
        ':url': film.url
      },
      ReturnValues: 'ALL_NEW',
    };

    const result = await this.dynamoDb.update(params).promise();
    return new Film(result.Attributes);
  }

  async deleteDBFilm(id: string): Promise<boolean> {
    const params = {
      TableName: this.starWarsTableName,
      Key: { id, entidad: "film" },
    };
    await this.dynamoDb.delete(params).promise();
    return true;
  }

  async getNextId(): Promise<string> {
    const params = {
      TableName: this.counterTableName,
      Key: { entidad: "film" },
      UpdateExpression: 'ADD #cnt :increment',
      ExpressionAttributeNames: {
        '#cnt': 'counter',
      },
      ExpressionAttributeValues: {
        ':increment': 1,
      },
      ReturnValues: 'ALL_NEW',
    };
    const result = await this.dynamoDb.update(params).promise();
    console.log(result);
    return result.Attributes.counter.toString();
  }

}