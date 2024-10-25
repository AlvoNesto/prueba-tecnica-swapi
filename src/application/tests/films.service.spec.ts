import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from '../services/films.service';
import { FilmsRepository } from '../../infrastructure/repositories/films.repository';
import { FilmMapper } from '../mappers/film-mapper';
import { Film } from '../../domain/entities/films.entity';
import { NotFoundException } from '@nestjs/common';

describe('FilmsService', () => {
  let service: FilmsService;
  let filmRepository: FilmsRepository;
  let filmMapper: FilmMapper;

  const mockFilmRepository = {
    getAllSwapiFilms: jest.fn(),
    getSwapiFilmById: jest.fn(),
  };

  const mockFilmMapper = {
    toSpanish: jest.fn((film: Film) => film), // Just return the film for testing
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        { provide: FilmsRepository, useValue: mockFilmRepository },
        { provide: FilmMapper, useValue: mockFilmMapper },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
    filmRepository = module.get<FilmsRepository>(FilmsRepository);
    filmMapper = module.get<FilmMapper>(FilmMapper);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllSwapiFilms', () => {
    it('should return an array of films', async () => {
      const result: Film[] = [{ id: '1', title: 'Film 1' } as Film];
      mockFilmRepository.getAllSwapiFilms.mockResolvedValue(result);

      expect(await service.getAllSwapiFilms()).toEqual(result);
      expect(filmMapper.toSpanish).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSwapiFilmById', () => {
    it('should return a film by ID', async () => {
      const result: Film = { id: '1', title: 'Film 1' } as Film;
      mockFilmRepository.getSwapiFilmById.mockResolvedValue(result);

      expect(await service.getSwapiFilmById('1')).toEqual(result);
      expect(filmMapper.toSpanish).toHaveBeenCalledTimes(1);
    });

    it('should throw a NotFoundException if film is not found', async () => {
      mockFilmRepository.getSwapiFilmById.mockResolvedValue(null);

      await expect(service.getSwapiFilmById('1')).rejects.toThrow(NotFoundException);
    });
  });
});
