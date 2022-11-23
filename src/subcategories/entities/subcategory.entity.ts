import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as dayjs from 'dayjs';
import { User } from '../../users/entities';
import { Category } from '../../categories/entities';
@Entity({ name: 'subcategories' })
export class Subcategory {
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

  @ManyToOne(() => User, (user) => user.createdBy, { eager: true })
  @JoinColumn({ name: 'createdBy' })
  createdBy: User;

  @ManyToOne(() => Category, (category) => category.subcategory, {
    eager: true,
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @ManyToOne(() => User, (user) => user.updatedBy, { eager: true })
  @JoinColumn({ name: 'updatedBy' })
  updatedBy: User;

  @Column({ type: 'timestamp', default: dayjs().format() })
  createdAt: string;

  @Column({ type: 'timestamp', default: dayjs().format() })
  updatedAt: string;
  //Falta image_id
}
