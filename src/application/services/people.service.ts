import { Injectable, NotFoundException } from '@nestjs/common';
import { PeopleRepository } from '../../infrastructure/repositories/people.repository';
import { People } from '../../domain/entities/people.entity';
import { PeopleMapper } from '../mappers/people-mapper';
import { PeopleDto } from '../../infrastructure/dtos/people.dto';

@Injectable()
export class PeopleService {
  constructor(private readonly peopleRepository: PeopleRepository, private readonly peopleMapper: PeopleMapper) {}

  async getAllSwapiPeople(): Promise<People[]> {
    const people = await this.peopleRepository.getAllSwapiPeople();
    return people.map(person => this.peopleMapper.toSpanish(person))
  }

  async getSwapiPeopleById(id: string): Promise<People> {
    const people = await this.peopleRepository.getSwapiPeopleById(id);
    if (!people) {
      throw new NotFoundException(`People with ID ${id} not found`);
    }
    return this.peopleMapper.toSpanish(people);
  }

  async getAllDBPeople(): Promise<People[]> {
    const people = await this.peopleRepository.getAllDBPeople();
    return people.map(person => this.peopleMapper.toSpanish(person))
  }

  async getDBPeopleById(id: string): Promise<People> {
    const people = await this.peopleRepository.getDBPeopleById(id);
    if (!people) {
      throw new NotFoundException(`People with ID ${id} not found`);
    }
    return this.peopleMapper.toSpanish(people);
  }

  async createDBPeople(peopleDto: PeopleDto): Promise<string> {
    const people: People = new People(peopleDto);
    const id = await this.peopleRepository.createDBPeople(people);
    return `Film with ID ${id} was created successfully. Use path GET:'/new/films/${id} to view it.'`;
  }

  async updateDBPeople(id: string, peopleDto: PeopleDto): Promise<string> {
    const people: People = new People(peopleDto);
    const existingPeople = await this.peopleRepository.getDBPeopleById(id);
    if (!existingPeople) {
      throw new NotFoundException(`People with ID ${id} not found`);
    }
    await this.peopleRepository.updateDBPeople(id, people);
    return `Film with ID ${id} was updated successfully. Use path GET:'/new/films/${id} to view it.'`;
  }

  async deleteDBPeople(id: string): Promise<string> {
    const people = await this.peopleRepository.getDBPeopleById(id);
    if (!people) {
      throw new NotFoundException(`People with ID ${id} not found`);
    }
    await this.peopleRepository.deleteDBPeople(id);
    return `Film with ID ${id} was deleted successfully`
  }
}
