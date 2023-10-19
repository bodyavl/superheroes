import { Injectable } from '@nestjs/common';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Superhero } from './entities/superhero.entity';
import { Repository } from 'typeorm';
import { PicturesService } from 'src/pictures/pictures.service';

@Injectable()
export class SuperheroesService {
  constructor(
    @InjectRepository(Superhero)
    private superheroesRepository: Repository<Superhero>,
    private picturesService: PicturesService,
  ) {}

  async create(
    createSuperheroDto: CreateSuperheroDto,
    pictures: Express.Multer.File[],
  ) {
    const newSuperhero = this.superheroesRepository.create(createSuperheroDto);
    const superhero = await this.superheroesRepository.save(newSuperhero);

    for (const picture of pictures) {
      await this.picturesService.create(picture.buffer, superhero);
    }

    return superhero;
  }

  findAll() {
    const superheroes = this.superheroesRepository.query(/*sql*/ `
      SELECT s.id, 
            s.nickname, 
            s.real_name,
            s.origin_description,
            s.superpowers,
            s.catch_phrase,
            json_agg(
            json_build_object(
              'id', p.id
            )
          ) AS pictures 
          FROM superhero s 
          LEFT JOIN picture p 
          ON p."superheroId" = s.id 
          GROUP BY s.id
          ORDER BY s.id`);

    return superheroes;
  }

  findOne(id: number) {
    const superhero = this.superheroesRepository.query(
      /*sql*/ `
      SELECT s.id, 
            s.nickname, 
            s.real_name,
            s.origin_description,
            s.superpowers,
            s.catch_phrase,
            json_agg(
            json_build_object(
              'id', p.id
            )
          ) AS pictures 
          FROM superhero s 
          LEFT JOIN picture p 
          ON p."superheroId" = s.id 
          WHERE s.id = $1
          GROUP BY s.id
          ORDER BY s.id`,
      [id],
    );

    return superhero;
  }

  update(id: number, updateSuperheroDto: UpdateSuperheroDto) {
    return `This action updates a #${id} superhero`;
  }

  remove(id: number) {
    return `This action removes a #${id} superhero`;
  }
}
