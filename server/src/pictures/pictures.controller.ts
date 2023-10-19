import { Controller, Get, Param, Res } from '@nestjs/common';
import { PicturesService } from './pictures.service';
import { Response } from 'express';

@Controller('pictures')
export class PicturesController {
  constructor(private readonly picturesService: PicturesService) {}

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const picture = await this.picturesService.findOne(+id);

    res.setHeader('Content-Type', 'image/jpeg');
    res.send(picture.data);
  }
}
