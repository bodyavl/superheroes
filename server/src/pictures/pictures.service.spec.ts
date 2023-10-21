import { Test, TestingModule } from '@nestjs/testing';
import { PicturesService } from './pictures.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Picture } from './entities/picture.entity';

describe('PicturesService', () => {
  let service: PicturesService;

  const mockPictureRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((dto) => Promise.resolve({ id: Date.now(), ...dto })),
    findOne: jest.fn().mockImplementation(({ where: { id } }) => ({ id })),
    delete: jest.fn().mockReturnValue({}),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PicturesService,
        {
          provide: getRepositoryToken(Picture),
          useValue: mockPictureRepository,
        },
      ],
    }).compile();

    service = module.get<PicturesService>(PicturesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a picture', async () => {
    const picture = await service.create(Buffer.from(''), { id: 1 } as any);

    expect(picture.id).toEqual(expect.any(Number));
    expect(picture.superhero.id).toEqual(1);
  });

  it('should find a picture', async () => {
    const picture = await service.findOne(1);

    expect(picture.id).toEqual(1);
  });

  it('should delete a picture', async () => {
    const picture = await service.delete({ id: 1 } as any);

    expect(picture).toEqual({});
  });
});
