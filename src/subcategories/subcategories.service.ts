import { Injectable } from '@nestjs/common';
import { CreateSubcategoryInput, UpdateSubcategoryInput } from './dto';

@Injectable()
export class SubcategoriesService {
  create(createSubcategoryInput: CreateSubcategoryInput) {
    return 'This action adds a new subcategory';
  }

  findAll() {
    return `This action returns all subcategories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subcategory`;
  }

  update(id: number, updateSubcategoryInput: UpdateSubcategoryInput) {
    return `This action updates a #${id} subcategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} subcategory`;
  }
}
