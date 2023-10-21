import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Superhero } from '../src/superheroes/entities/superhero.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
  });

  describe('/superheroes', () => {
    it('/ (POST)', () => {
      const data = new FormData();
      data.append('nickname', 'Superman');
      data.append('real_name', 'Clark Kent');
      data.append('origin_description', 'Krypton');
      data.append('superpowers', 'Flight, super strength, x-ray vision');
      data.append('catch_phrase', 'Up, up and away!');

      return request(app.getHttpServer())
        .post('/superheroes')
        .set('Content-Type', 'multipart/form-data')
        .send(data)
        .expect(200);
    });
  });
});
