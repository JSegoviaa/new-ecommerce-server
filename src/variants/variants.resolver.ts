import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VariantsService } from './variants.service';
import { Variant } from './entities';
import { CreateVariantInput, UpdateVariantInput } from './dto';

@Resolver(() => Variant)
export class VariantsResolver {
  constructor(private readonly variantsService: VariantsService) {}

  @Mutation(() => Variant)
  createVariant(
    @Args('createVariantInput') createVariantInput: CreateVariantInput,
  ) {
    return this.variantsService.create(createVariantInput);
  }

  @Query(() => [Variant], { name: 'variants' })
  findAll() {
    return this.variantsService.findAll();
  }

  @Query(() => Variant, { name: 'variant' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.variantsService.findOne(id);
  }

  @Mutation(() => Variant)
  updateVariant(
    @Args('updateVariantInput') updateVariantInput: UpdateVariantInput,
  ) {
    return this.variantsService.update(
      updateVariantInput.id,
      updateVariantInput,
    );
  }

  @Mutation(() => Variant)
  removeVariant(@Args('id', { type: () => Int }) id: number) {
    return this.variantsService.remove(id);
  }
}
