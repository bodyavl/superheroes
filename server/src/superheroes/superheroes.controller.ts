import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
  Put,
} from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('superheroes')
export class SuperheroesController {
  constructor(private readonly superheroesService: SuperheroesService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('pictures'))
  create(
    @UploadedFiles() pictures: Express.Multer.File[],
    @Body() createSuperheroDto: CreateSuperheroDto,
  ) {
    return this.superheroesService.create(createSuperheroDto, pictures);
  }

  @Get()
  findAll() {
    return this.superheroesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.superheroesService.findOne(+id);
  }

  @Put(':id')
  @UseInterceptors(FilesInterceptor('pictures'))
  update(
    @UploadedFiles() pictures: Express.Multer.File[],
    @Param('id') id: string,
    @Body() updateSuperheroDto: UpdateSuperheroDto,
  ) {
    return this.superheroesService.update(+id, updateSuperheroDto, pictures);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.superheroesService.remove(+id);
  }
}
