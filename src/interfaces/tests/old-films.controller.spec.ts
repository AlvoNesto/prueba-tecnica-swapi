import { Test, TestingModule } from '@nestjs/testing';
import { OldFilmsController } from '../controllers/old-films.controller';
import { FilmsService } from '../../application/services/films.service';
import { Film } from '../../domain/entities/films.entity';

describe('OldFilmsController', () => {
  let oldFilmsController: OldFilmsController;
  let filmsService: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OldFilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: {
            getAllSwapiFilms: jest.fn(),
          },
        },
      ],
    }).compile();

    oldFilmsController = module.get<OldFilmsController>(OldFilmsController);
    filmsService = module.get<FilmsService>(FilmsService);
  });

  describe('getAllSwapiFilms', () => {
    it('should return an array of films', async () => {
      
      const mockFilms: Film[] = [
        {
          id: '1',
          entidad: 'movie',
          title: 'A New Hope',
          episode_id: 4,
          opening_crawl: 'It is a period of civil war...',
          director: 'George Lucas',
          producer: 'Gary Kurtz, Rick McCallum',
          release_date: '1977-05-25',
          characters: ['1', '2', '3'],
          planets: ['Tatooine', 'Alderaan'],
          starships: ['X-wing', 'Death Star'],
          vehicles: ['Sand Crawler'],
          species: ['Human', 'Droid'],
          created: '1977-05-25',
          edited: '1978-05-25',
          url: 'https://swapi.dev/api/films/1/',
        },
      ];

      jest.spyOn(filmsService, 'getAllSwapiFilms').mockResolvedValue(mockFilms);

      const result = await oldFilmsController.getAllSwapiFilms();
      
      expect(result).toEqual(mockFilms);
      expect(filmsService.getAllSwapiFilms).toHaveBeenCalledTimes(1);
    });
  });
});
