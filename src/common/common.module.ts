import { Module } from '@nestjs/common';

import { ErrorHandlerService } from './services/error-handler';
import { CreateSlugService } from './services/create-slug';

@Module({
  providers: [ErrorHandlerService, CreateSlugService],
  exports: [ErrorHandlerService, CreateSlugService],
})
export class CommonModule {}
