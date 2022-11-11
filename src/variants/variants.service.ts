import { Injectable } from '@nestjs/common';
import { CreateVariantInput, UpdateVariantInput } from './dto';

@Injectable()
export class VariantsService {
  create(createVariantInput: CreateVariantInput) {
    return 'This action adds a new variant';
  }

  findAll() {
    return `This action returns all variants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} variant`;
  }

  update(id: number, updateVariantInput: UpdateVariantInput) {
    return `This action updates a #${id} variant`;
  }

  remove(id: number) {
    return `This action removes a #${id} variant`;
  }
}
