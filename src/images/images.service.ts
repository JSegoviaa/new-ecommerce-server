import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { ErrorHandlerService } from '../common/services/error-handler';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    private readonly errorHandlerService: ErrorHandlerService,
  ) {}

  async uploadImage(
    file: Express.Multer.File,
    path: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    try {
      return new Promise((resolve, reject) => {
        const upload = v2.uploader.upload_stream(
          {
            folder: `prueba/${path}`,
            public_id: file.originalname,
          },
          async (error, result) => {
            if (error) return reject(error);
            resolve(result);

            const newImage = this.imageRepository.create({
              url: result.secure_url,
            });

            await this.imageRepository.save(newImage);
          },
        );
        toStream(file.buffer).pipe(upload);
      });
    } catch (error) {
      this.errorHandlerService.errorHandler(error);
    }
  }
}
