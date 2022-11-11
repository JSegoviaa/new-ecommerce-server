import { Module } from '@nestjs/common';
import { ErrorHandlerService } from './services/error-handler';

@Module({
  providers: [ErrorHandlerService],
  exports: [ErrorHandlerService],
})
export class CommonModule {}
