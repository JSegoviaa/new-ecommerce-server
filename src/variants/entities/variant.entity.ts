import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Variant {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
