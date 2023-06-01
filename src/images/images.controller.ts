import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { fileFilter } from './helpers';
import { ImagesService } from './images.service';
import { Auth } from '../auth/decorators';
import { ValidRoles } from '../auth/interfaces';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @Auth(ValidRoles.superAdmin, ValidRoles.admin, ValidRoles.moderador)
  @UseInterceptors(FileInterceptor('image', { fileFilter }))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.imagesService.uploadImage(file, '');
  }

  @Get()
  @Auth(ValidRoles.superAdmin, ValidRoles.admin, ValidRoles.moderador)
  getImage(@Query() query: { image: string }) {
    console.log(query);
    return this.imagesService.findImageByUrl(query);
  }
}
