import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { PeopleService } from '../../application/services/people.service';
import { People } from '../../domain/entities/people.entity';

@Controller('old/people')
export class OldPeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  async getAllSwapiPeoples(): Promise<People[]> {
    return await this.peopleService.getAllSwapiPeople();
  }

  @Get(':id')
  async getSwapiPeopleById(@Param('id') id: string): Promise<People> {
    return await this.peopleService.getSwapiPeopleById(id);
  }
  
}
