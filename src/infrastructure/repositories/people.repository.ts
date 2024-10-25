import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import { IPeopleRepository } from '../../domain/repositories/people.repository.interface';
import { People } from '../../domain/entities/people.entity';
import { URL } from '../database/swapi.config';

@Injectable()
export class PeopleRepository implements IPeopleRepository {
  private dynamoDb: DynamoDB.DocumentClient;
  private tableName: string = process.env.DYNAMODB_TABLE_PEOPLE;

  constructor() {
    this.dynamoDb = new DynamoDB.DocumentClient();
  }

  async getAllSwapiPeople(): Promise<People[]> {
    let response = await fetch(`${URL}/people`);
    let currentData = await response.json();
    let totalData = [];
    while (currentData.next) {
        totalData = totalData.concat(currentData.results);
        response = await fetch(currentData.next);
        currentData = await response.json();
    }
    totalData = totalData.concat(currentData.results);
    return totalData.map(item => new People(item));
  }

  async getSwapiPeopleById(id: string): Promise<People> {
    const response = await fetch(`${URL}/people/${id}`);
    const data = await response.json();
    return new People(data);
  }

  async getAllDBPeople(): Promise<People[]> {
    const params = { TableName: this.tableName };
    const result = await this.dynamoDb.scan(params).promise();
    return result.Items.map(item => new People(item));
  }

  async getDBPeopleById(id: string): Promise<People> {
    const params = {
      TableName: this.tableName,
      Key: { id },
    };
    const result = await this.dynamoDb.get(params).promise();
    return result.Item ? new People(result.Item) : null;
  }

  async createDBPeople(people: People): Promise<People> {
    const params = {
      TableName: this.tableName,
      Item: people,
    };
    await this.dynamoDb.put(params).promise();
    return people;
  }

  async updateDBPeople(id: string, people: People): Promise<People> {
    const params = {
      TableName: this.tableName,
      Key: { id },
      UpdateExpression: 'set #name = :name, #height = :height, #mass = :mass, #hair_color = :hair_color, #skin_color = :skin_color, #eye_color = :eye_color, #birth_year = :birth_year, #gender = :gender, #homeworld = :homeworld, #films = :films, #species = :species, #vehicles = :vehicles, #starships = :starships, #created = :created, #edited = :edited, #url = :url',
      ExpressionAttributeNames: {
        '#name': 'name',
        '#height': 'height',
        '#mass': 'mass',
        '#hair_color': 'hair_color',
        '#skin_color': 'skin_color',
        '#eye_color': 'eye_color',
        '#birth_year': 'birth_year',
        '#gender': 'gender',
        '#homeworld': 'homeworld',
        '#films': 'films',
        '#species': 'species',
        '#vehicles': 'vehicles',
        '#starships': 'starships',
        '#created': 'created',
        '#edited': 'edited',
        '#url': 'url'
      },
      ExpressionAttributeValues: {
        ':name': people.name,
        ':height': people.height,
        ':mass': people.mass,
        ':hair_color': people.hair_color,
        ':skin_color': people.skin_color,
        ':eye_color': people.eye_color,
        ':birth_year': people.birth_year,
        ':gender': people.gender,
        ':homeworld': people.homeworld,
        ':films': people.films,
        ':species': people.species,
        ':vehicles': people.vehicles,
        ':starships': people.starships,
        ':created': people.created,
        ':edited': new Date().toISOString(),
        ':url': people.url
      },
      ReturnValues: 'ALL_NEW',
    };

    const result = await this.dynamoDb.update(params).promise();
    return new People(result.Attributes);
  }

  async deleteDBPeople(id: string): Promise<boolean> {
    const params = {
      TableName: this.tableName,
      Key: { id },
    };
    await this.dynamoDb.delete(params).promise();
    return true;
  }

}
