import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Superhero } from './entities/superhero.entity';
import { Repository } from 'typeorm';
import { PicturesService } from '../pictures/pictures.service';
import {
  paginate,
  IPaginationOptions,
  paginateRaw,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Picture } from '../pictures/entities/picture.entity';

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
  ): Promise<Superhero> {
    const newSuperhero = this.superheroesRepository.create(createSuperheroDto);
    const superhero = await this.superheroesRepository.save(newSuperhero);

    for (const picture of pictures) {
      await this.picturesService.create(picture.buffer, superhero);
    }

    return superhero;
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Superhero>> {
    const superheroesQuery = this.superheroesRepository
      .createQueryBuilder('s')
      .select('s.id, s.nickname')
      .addSelect((subQuery) => {
        return subQuery
          .select('p.id', 'pictureId')
          .from(Picture, 'p')
          .where('p.superheroId = s.id')
          .orderBy('p.id', 'ASC')
          .limit(1);
      }, 'pictureId')
      .orderBy('s.id');

    return paginateRaw<Superhero>(superheroesQuery, options);
  }

  async findOne(id: number): Promise<Superhero> {
    const superhero = await this.superheroesRepository.query(
      /*sql*/ `
      SELECT s.*,
            CASE
               WHEN count(p.id) = 0 THEN null
               ELSE json_agg(
                json_build_object(
                  'id', p.id
                )
              ) 
            END AS pictures 
          FROM superhero s 
          LEFT JOIN picture p 
          ON p."superheroId" = s.id 
          WHERE s.id = $1
          GROUP BY s.id
          ORDER BY s.id`,
      [id],
    );

    if (!superhero.length) {
      throw new NotFoundException('Superhero not found');
    }

    return superhero;
  }

  async update(
    id: number,
    updateSuperheroDto: UpdateSuperheroDto,
    pictures: Express.Multer.File[],
  ) {
    const superhero = await this.superheroesRepository.findOne({
      where: { id },
    });

    if (!superhero) {
      throw new NotFoundException('Superhero not found');
    }

    await this.picturesService.delete({ superhero });

    const updateUser = this.superheroesRepository.create(updateSuperheroDto);

    for (const picture of pictures) {
      await this.picturesService.create(picture.buffer, superhero);
    }

    return this.superheroesRepository.save(updateUser);
  }

  async remove(id: number) {
    const superhero = await this.superheroesRepository.findOne({
      where: { id },
    });

    if (!superhero) throw new NotFoundException('Superhero not found');

    return this.superheroesRepository.remove(superhero);
  }
}
