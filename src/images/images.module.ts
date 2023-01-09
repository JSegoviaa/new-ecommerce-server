import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { CommonModule } from '../common/common.module';
import { CloudinaryProvider } from './images.provider';
import { Image } from './entities';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService, CloudinaryProvider],
  imports: [TypeOrmModule.forFeature([Image]), CommonModule],
  exports: [TypeOrmModule, ImagesModule],
})
export class ImagesModule {}
