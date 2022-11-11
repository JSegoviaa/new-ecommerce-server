import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import * as dayjs from 'dayjs';

import { Role } from '../../roles/entities';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field(() => String)
  firstName: string;

  @Column()
  @Field(() => String)
  lastName: string;

  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Column({ unique: true, nullable: true })
  @Field(() => String)
  phoneNumber: string;

  @Column()
  @Field(() => String)
  password: string;

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

  @Column({ type: 'boolean', default: true })
  @Field(() => Boolean)
  isActive: boolean;

  @ManyToOne(() => Role, (role) => role.user, { eager: true })
  @Field(() => Role)
  role: Role;
}
