import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import { IFilmsRepository } from '../../domain/repositories/films.repository.interface';
import { Film } from '../../domain/entities/films.entity';
import { URL } from '../database/swapi.config';

@Injectable()
export class FilmsRepository implements IFilmsRepository {
  private dynamoDb: DynamoDB.DocumentClient;
  private tableName: string = process.env.DYNAMODB_TABLE_FILMS;

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

  async getAllDBFilms(): Promise<Film[]> {
    const params = { TableName: this.tableName };
    const result = await this.dynamoDb.scan(params).promise();
    return result.Items.map(item => new Film(item));
  }

  async getDBFilmById(id: string): Promise<Film> {
    const params = {
      TableName: this.tableName,
      Key: { id },
    };
    const result = await this.dynamoDb.get(params).promise();
    return result.Item ? new Film(result.Item) : null;
  }

  async createDBFilm(film: Film): Promise<Film> {
    const params = {
      TableName: this.tableName,
      Item: film,
    };
    await this.dynamoDb.put(params).promise();
    return film;
  }

  async updateDBFilm(id: string, film: Film): Promise<Film> {
    const params = {
      TableName: this.tableName,
      Key: { id },
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
      TableName: this.tableName,
      Key: { id },
    };
    await this.dynamoDb.delete(params).promise();
    return true;
  }

}
