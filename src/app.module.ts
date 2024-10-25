import { Module } from '@nestjs/common';
import { FilmsService } from './application/services/films.service';
import { OldFilmsController } from './interfaces/controllers/old-films.controller';
import { NewFilmsController } from './interfaces/controllers/new-films.controller';
import { FilmsRepository } from './infrastructure/repositories/films.repository';
import { FilmMapper } from './application/mappers/film-mapper';
import { PeopleService } from './application/services/people.service';
import { OldPeopleController } from './interfaces/controllers/old-people.controller';
import { NewPeopleController } from './interfaces/controllers/new-people.controller';
import { PeopleRepository } from './infrastructure/repositories/people.repository';
import { PeopleMapper } from './application/mappers/people-mapper';

@Module({
  imports: [],
  controllers: [OldFilmsController, NewFilmsController, OldPeopleController, NewPeopleController],
  providers: [FilmsService, FilmsRepository, FilmMapper, PeopleService, PeopleRepository, PeopleMapper],
})
export class AppModule {}
