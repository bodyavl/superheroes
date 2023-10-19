import { Injectable, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Picture } from './entities/picture.entity';
import { Superhero } from 'src/superheroes/entities/superhero.entity';
import { createReadStream } from 'fs';

@Injectable()
export class PicturesService {
  constructor(
    @InjectRepository(Picture) private pictureRepository: Repository<Picture>,
  ) {}

  async create(data: Buffer, superhero: Superhero): Promise<Picture> {
    const picture = this.pictureRepository.create({ data, superhero });

    return this.pictureRepository.save(picture);
  }

  async findOne(id: number): Promise<Picture> {
    const picture = await this.pictureRepository.findOne({ where: { id } });
    return picture;
  }
}
