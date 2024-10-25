import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { PeopleService } from '../../application/services/people.service';
import { People } from '../../domain/entities/people.entity';
import { PeopleDto } from '../../infrastructure/dtos/people.dto';

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
  @UsePipes(new ValidationPipe({ transform: true }))
  async createPeople(@Body() people: PeopleDto): Promise<People> {
    return await this.peopleService.createDBPeople(people);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updatePeople(@Param('id') id: string, @Body() people: PeopleDto): Promise<People> {
    return await this.peopleService.updateDBPeople(id, people);
  }

  @Delete(':id')
  async deletePeople(@Param('id') id: string): Promise<void> {
    await this.peopleService.deleteDBPeople(id);
  }
}
