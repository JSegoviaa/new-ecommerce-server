import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateVariantInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
