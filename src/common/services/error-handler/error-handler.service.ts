import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

@Injectable()
export class ErrorHandlerService {
  private readonly logger = new Logger('ErrorHandleService');

  public errorHandler(error: any) {
    console.log({ error });
    if (error.code === '23505') {
      this.logger.error(error);
      throw new BadRequestException(error.detail);
    }

    if (error.code === '23503') {
      this.logger.error(error);
      throw new BadRequestException(error.detail);
    }

    if (error.response.statusCode === 404) {
      this.logger.error(error);
      throw new NotFoundException(error.response.message);
    }

    if (error.response.statusCode === 401) {
      this.logger.error(error);
      throw new UnauthorizedException(error.response.message);
    }

    if (error.response.statusCode === 400) {
      this.logger.error(error);
      throw new BadRequestException(error.response.message);
    }

    this.logger.error(error);

    throw new InternalServerErrorException('Unexpected Error');
  }
}
