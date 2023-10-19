import { Module } from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { SuperheroesController } from './superheroes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Superhero } from './entities/superhero.entity';
import { PicturesModule } from 'src/pictures/pictures.module';

@Module({
  imports: [TypeOrmModule.forFeature([Superhero]), PicturesModule],
  controllers: [SuperheroesController],
  providers: [SuperheroesService],
})
export class SuperheroesModule {}
