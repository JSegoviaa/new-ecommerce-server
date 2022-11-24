import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as dayjs from 'dayjs';
import { User } from '../../users/entities';
import { Subcategory } from '../../subcategories/entities';
import { Image } from '../../images/entities';
@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false, unique: true })
  slug: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  isPublished: boolean;

  @ManyToOne(() => User, ({ createdBy }) => createdBy, { eager: true })
  @JoinColumn({ name: 'createdBy' })
  createdBy: User;

  @OneToMany(() => Subcategory, ({ category }) => category)
  @JoinColumn()
  subcategory: Subcategory;

  @ManyToOne(() => Image, ({ category }) => category, { eager: true })
  image: Image;

  @ManyToOne(() => User, ({ updatedBy }) => updatedBy, { eager: true })
  @JoinColumn({ name: 'updatedBy' })
  updatedBy: User;

  @Column({ type: 'timestamp', default: dayjs().format() })
  createdAt: string;

  @Column({ type: 'timestamp', default: dayjs().format() })
  updatedAt: string;
}
