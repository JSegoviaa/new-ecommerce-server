import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as dayjs from 'dayjs';

@Entity({ name: 'categories' })
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ unique: true })
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  slug: string;

  @Column({ type: 'boolean', default: true })
  @Field(() => Boolean)
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  @Field(() => Boolean)
  isPublished: boolean;

  @Column({
    type: 'timestamp',
    default: dayjs().format(),
  })
  @Field(() => String)
  createdAt: string;

  @Column({
    type: 'timestamp',
    default: dayjs().format(),
  })
  @Field(() => String)
  updatedAt: string;
}
