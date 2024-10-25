import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import { IFilmsNewSwapiRepository } from '../../domain/repositories/films.new-swapi.repository.interface';
import { Film } from '../../domain/entities/films.entity';

@Injectable()
export class FilmsNewSwapiRepository implements IFilmsNewSwapiRepository {
  private dynamoDb: DynamoDB.DocumentClient;
  private tableName: string = process.env.DYNAMODB_TABLE_FILMS;

  constructor() {
    this.dynamoDb = new DynamoDB.DocumentClient();
  }

  async getAllFilms(): Promise<Film[]> {
    const params = { TableName: this.tableName };
    const result = await this.dynamoDb.scan(params).promise();
    return result.Items.map(item => new Film(item));
  }

  async getFilmById(id: string): Promise<Film> {
    const params = {
      TableName: this.tableName,
      Key: { id },
    };
    const result = await this.dynamoDb.get(params).promise();
    return result.Item ? new Film(result.Item) : null;
  }

  async createFilm(film: Film): Promise<Film> {
    const params = {
      TableName: this.tableName,
      Item: film,
    };
    await this.dynamoDb.put(params).promise();
    return film;
  }

  async updateFilm(id: string, film: Film): Promise<Film> {
    const params = {
      TableName: this.tableName,
      Key: { id },
      UpdateExpression: 'set #title = :title, #director = :director, #producer = :producer, #releaseDate = :releaseDate, #episodeId = :episodeId, #openingCrawl = :openingCrawl, #updatedAt = :updatedAt',
      ExpressionAttributeNames: {
        '#title': 'title',
        '#director': 'director',
        '#producer': 'producer',
        '#releaseDate': 'releaseDate',
        '#episodeId': 'episodeId',
        '#openingCrawl': 'openingCrawl',
        '#updatedAt': 'updatedAt',
      },
      ExpressionAttributeValues: {
        ':title': film.title,
        ':director': film.director,
        ':producer': film.producer,
        ':releaseDate': film.releaseDate,
        ':episodeId': film.episodeId,
        ':openingCrawl': film.openingCrawl,
        ':updatedAt': new Date().toISOString(),
      },
      ReturnValues: 'ALL_NEW',
    };

    const result = await this.dynamoDb.update(params).promise();
    return new Film(result.Attributes);
  }

  async deleteFilm(id: string): Promise<boolean> {
    const params = {
      TableName: this.tableName,
      Key: { id },
    };
    await this.dynamoDb.delete(params).promise();
    return true;
  }
}
