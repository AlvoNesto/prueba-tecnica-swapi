import { Injectable, NotFoundException } from '@nestjs/common';
import { PeopleRepository } from '../../infrastructure/repositories/people.repository';
import { People } from '../../domain/entities/people.entity';
import { PeopleMapper } from '../mappers/people-mapper';

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

  async createDBPeople(people: People): Promise<People> {
    return await this.peopleRepository.createDBPeople(people);
  }

  async updateDBPeople(id: string, people: People): Promise<People> {
    const existingPeople = await this.peopleRepository.getDBPeopleById(id);
    if (!existingPeople) {
      throw new NotFoundException(`People with ID ${id} not found`);
    }
    return await this.peopleRepository.updateDBPeople(id, people);
  }

  async deleteDBPeople(id: string): Promise<void> {
    const people = await this.peopleRepository.getDBPeopleById(id);
    if (!people) {
      throw new NotFoundException(`People with ID ${id} not found`);
    }
    await this.peopleRepository.deleteDBPeople(id);
  }
}
