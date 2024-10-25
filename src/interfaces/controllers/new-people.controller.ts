import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { PeopleService } from '../../application/services/people.service';
import { People } from '../../domain/entities/people.entity';

@Controller('new/people')
export class NewPeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get()
  async getAllPeople(): Promise<People[]> {
    return await this.peopleService.getAllDBPeople();
  }

  @Get(':id')
  async getPeopleById(@Param('id') id: string): Promise<People> {
    return await this.peopleService.getDBPeopleById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPeople(@Body() people: People): Promise<People> {
    return await this.peopleService.createDBPeople(people);
  }

  @Put(':id')
  async updatePeople(@Param('id') id: string, @Body() people: People): Promise<People> {
    return await this.peopleService.updateDBPeople(id, people);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePeople(@Param('id') id: string): Promise<void> {
    await this.peopleService.deleteDBPeople(id);
  }
}
