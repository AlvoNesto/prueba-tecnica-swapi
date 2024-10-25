import { Module } from '@nestjs/common';
import { FilmsOldSwapiService } from './application/services/films.old-swapi.service';
import { FilmsNewSwapiService } from './application/services/films.new-swapi.service';
import { FilmsOldSwapiController } from './interfaces/controllers/films.old-swapi.controller';
import { FilmsNewSwapiController } from './interfaces/controllers/films.new-swapi.controller';
import { FilmsOldSwapiRepository } from './infrastructure/repositories/films.old-swapi.repository';
import { FilmsNewSwapiRepository } from './infrastructure/repositories/films.new-swapi.repository';


@Module({
  imports: [],
  controllers: [FilmsOldSwapiController, FilmsNewSwapiController],
  providers: [FilmsOldSwapiService, FilmsNewSwapiService, FilmsOldSwapiRepository, FilmsNewSwapiRepository],
})
export class AppModule {}
