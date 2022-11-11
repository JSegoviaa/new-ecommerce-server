import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SubcategoriesService } from './subcategories.service';
import { Subcategory } from './entities';
import { CreateSubcategoryInput, UpdateSubcategoryInput } from './dto';

@Resolver(() => Subcategory)
export class SubcategoriesResolver {
  constructor(private readonly subcategoriesService: SubcategoriesService) {}

  @Mutation(() => Subcategory)
  createSubcategory(
    @Args('createSubcategoryInput')
    createSubcategoryInput: CreateSubcategoryInput,
  ) {
    return this.subcategoriesService.create(createSubcategoryInput);
  }

  @Query(() => [Subcategory], { name: 'subcategories' })
  findAll() {
    return this.subcategoriesService.findAll();
  }

  @Query(() => Subcategory, { name: 'subcategory' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.subcategoriesService.findOne(id);
  }

  @Mutation(() => Subcategory)
  updateSubcategory(
    @Args('updateSubcategoryInput')
    updateSubcategoryInput: UpdateSubcategoryInput,
  ) {
    return this.subcategoriesService.update(
      updateSubcategoryInput.id,
      updateSubcategoryInput,
    );
  }

  @Mutation(() => Subcategory)
  removeSubcategory(@Args('id', { type: () => Int }) id: number) {
    return this.subcategoriesService.remove(id);
  }
}
