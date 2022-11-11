import { CreateVariantInput } from './create-variant.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateVariantInput extends PartialType(CreateVariantInput) {
  @Field(() => Int)
  id: number;
}
