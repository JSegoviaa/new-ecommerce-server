import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as dayjs from 'dayjs';
import { User } from '../../users/entities';
import { Subcategory } from '../../subcategories/entities';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false, unique: true })
  slug: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 0 })
  discount: number;

  @Column({ type: 'boolean', default: false })
  isPublished: boolean;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ManyToOne(() => User, ({ createdBy }) => createdBy, { eager: true })
  @JoinColumn({ name: 'createdBy' })
  createdBy: User;

  @ManyToOne(() => User, ({ updatedBy }) => updatedBy, { eager: true })
  @JoinColumn({ name: 'updatedBy' })
  updatedBy: User;

  @ManyToMany(() => Subcategory, (subcatgory) => subcatgory.product, {
    eager: true,
  })
  subcategory: Subcategory[];

  @Column({
    type: 'timestamp',
    default: dayjs().format(),
  })
  createdAt: string;

  @Column({
    type: 'timestamp',
    default: dayjs().format(),
  })
  updatedAt: string;
}
