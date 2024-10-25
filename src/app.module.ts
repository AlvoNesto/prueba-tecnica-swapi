import { Module } from '@nestjs/common';
import { FilmsService } from './application/services/films.service';
import { OldFilmsController } from './interfaces/controllers/old-films.controller';
import { NewFilmsController } from './interfaces/controllers/new-films.controller';
import { FilmsRepository } from './infrastructure/repositories/films.repository';


@Module({
  imports: [],
  controllers: [OldFilmsController, NewFilmsController],
  providers: [FilmsService, FilmsRepository],
})
export class AppModule {}
