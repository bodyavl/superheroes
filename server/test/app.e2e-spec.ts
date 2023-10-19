import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Superhero } from '../src/superheroes/entities/superhero.entity';
import { createReadStream, readFile } from 'fs';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/superheroes', () => {
    it('/add', () => {
      const data = new FormData();
      data.append('nickname', 'Superman');
      data.append('real_name', 'Clark Kent');
      data.append('origin_description', 'Krypton');
      data.append('superpowers', 'Flight, super strength, x-ray vision');
      data.append('catch_phrase', 'Up, up and away!');

      return request(app.getHttpServer())
        .post('/superheroes/add')
        .set('Content-Type', 'multipart/form-data')
        .send(data)
        .expect(200)
        .expect(Superhero);
    });
  });
});
