import { Injectable } from '@nestjs/common';
import { CreateSubcategoryDto, UpdateSubcategoryDto } from './dto';

@Injectable()
export class SubcategoriesService {
  create(createSubcategoryDto: CreateSubcategoryDto) {
    return 'This action adds a new subcategory';
  }

  findAll() {
    return `This action returns all subcategories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subcategory`;
  }

  update(id: number, updateSubcategoryDto: UpdateSubcategoryDto) {
    return `This action updates a #${id} subcategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} subcategory`;
  }
}
