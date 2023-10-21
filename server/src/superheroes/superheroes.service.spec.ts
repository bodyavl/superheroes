import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroesService } from './superheroes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Superhero } from './entities/superhero.entity';
import { PicturesService } from '../pictures/pictures.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { SelectQueryBuilder } from 'typeorm';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';
import { mock } from 'node:test';

jest.mock('nestjs-typeorm-paginate', () => ({
  paginateRaw: jest.fn().mockImplementation((queryBuilder, options) => {
    return {
      items: [],
      meta: {
        itemCount: options.limit,
        totalItems: 2,
        totalPages: 1,
        currentPage: options.page,
      },
    };
  }),
}));

describe('SuperheroesService', () => {
  let service: SuperheroesService;

  const mockSuperHero = {
    id: 1,
    nickname: 'Superman',
    real_name: 'Clark Kent',
    origin_description: 'Krypton',
    catch_phrase: 'Up, up and away!',
    superpowers: 'Flight, super strength, x-ray vision',
  };

  const mockSuperheroRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((dto) => Promise.resolve({ id: Date.now(), ...dto })),
    findOne: jest.fn().mockImplementation((id) => mockSuperHero),
    remove: jest.fn().mockImplementation((id) => mockSuperHero),
    createQueryBuilder: jest.fn(() => mockCreateQueryBuilder),
    query: jest.fn().mockImplementation(() => [mockSuperHero]),
  };

  const mockCreateQueryBuilder = {
    select: jest.fn().mockImplementation(() => mockCreateQueryBuilder),
    addSelect: jest.fn().mockImplementation(() => mockCreateQueryBuilder),
    orderBy: jest.fn().mockImplementation(() => {
      let query: SelectQueryBuilder<Superhero> = mockCreateQueryBuilder;
      return query;
    }),
    limit: jest.fn().mockImplementation(() => mockCreateQueryBuilder),
  };

  const mockPicturesService = {
    create: jest.fn().mockReturnValue({}),
    delete: jest.fn().mockReturnValue({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SuperheroesService,
        {
          provide: getRepositoryToken(Superhero),
          useValue: mockSuperheroRepository,
        },
        {
          provide: PicturesService,
          useValue: mockPicturesService,
        },
      ],
    }).compile();

    service = module.get<SuperheroesService>(SuperheroesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create superhero', async () => {
    const dto: CreateSuperheroDto = {
      nickname: 'Superman',
      real_name: 'Clark Kent',
      origin_description: 'Krypton',
      catch_phrase: 'Up, up and away!',
      superpowers: 'Flight, super strength, x-ray vision',
    };

    const res = await service.create(dto, []);
    expect(res).toBeInstanceOf(Object);
    expect(res.nickname).toEqual(dto.nickname);
    expect(res.real_name).toEqual(dto.real_name);
    expect(res.origin_description).toEqual(dto.origin_description);
    expect(res.catch_phrase).toEqual(dto.catch_phrase);
    expect(res.superpowers).toEqual(dto.superpowers);
    expect(mockSuperheroRepository.create).toHaveBeenCalledWith(dto);
  });

  it('should return all superheroes with pagination', async () => {
    const res = await service.paginate({ page: 1, limit: 5 });

    expect(res).toBeInstanceOf(Object);
    expect(res.items).toBeInstanceOf(Array);
    expect(res.meta).toBeInstanceOf(Object);
    expect(res.meta.currentPage).toEqual(1);
    expect(res.meta.itemCount).toEqual(5);
    expect(res.meta.totalItems).toEqual(2);
  });

  it('should return superhero by id', async () => {
    const superhero = await service.findOne(1);

    expect(superhero).toBeInstanceOf(Object);
    expect(superhero.id).toEqual(1);
  });

  it('should update superhero', async () => {
    const dto: UpdateSuperheroDto = {
      nickname: 'Superman',
      real_name: 'Clark Kent',
      origin_description: 'Krypton',
      catch_phrase: 'Up, up and away!',
      superpowers: 'Flight, super strength, x-ray vision',
    };

    const res = await service.update(1, dto, []);

    expect(res).toBeInstanceOf(Object);
    expect(res.nickname).toEqual(dto.nickname);
    expect(res.real_name).toEqual(dto.real_name);
    expect(res.origin_description).toEqual(dto.origin_description);
    expect(res.catch_phrase).toEqual(dto.catch_phrase);
    expect(res.superpowers).toEqual(dto.superpowers);
    expect(mockSuperheroRepository.create).toHaveBeenCalledWith(dto);
  });

  it('should delete superhero', async () => {
    const res = await service.remove(1);

    expect(res).toBeInstanceOf(Object);
    expect(res).toEqual(mockSuperHero);
  });
});
