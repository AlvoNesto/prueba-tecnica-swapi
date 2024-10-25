import { Test, TestingModule } from '@nestjs/testing';
import { OldFilmsController } from '../controllers/old-films.controller';
import { FilmsService } from '../../application/services/films.service';
import { Film } from '../../domain/entities/films.entity';
import { NotFoundException } from '@nestjs/common';

describe('OldFilmsController', () => {
  let controller: OldFilmsController;
  let filmService: FilmsService;

  const mockFilmService = {
    getAllSwapiFilms: jest.fn(),
    getSwapiFilmById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OldFilmsController],
      providers: [
        { provide: FilmsService, useValue: mockFilmService },
      ],
    }).compile();

    controller = module.get<OldFilmsController>(OldFilmsController);
    filmService = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllSwapiFilms', () => {
    it('should return an array of films', async () => {
      const result: Film[] = [{ id: '1', title: 'Film 1' } as Film];
      mockFilmService.getAllSwapiFilms.mockResolvedValue(result);

      expect(await controller.getAllSwapiFilms()).toEqual(result);
      expect(filmService.getAllSwapiFilms).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSwapiFilmById', () => {
    it('should return a film by ID', async () => {
      const result: Film = { id: '1', title: 'Film 1' } as Film;
      mockFilmService.getSwapiFilmById.mockResolvedValue(result);

      expect(await controller.getSwapiFilmById('1')).toEqual(result);
      expect(filmService.getSwapiFilmById).toHaveBeenCalledWith('1');
    });

    it('should throw a NotFoundException if film is not found', async () => {
      mockFilmService.getSwapiFilmById.mockResolvedValue(null);

      await expect(controller.getSwapiFilmById('1')).rejects.toThrow(NotFoundException);
    });
  });
});
