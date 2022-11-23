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

  @ManyToOne(() => User, (user) => user.createdBy, { eager: true })
  @JoinColumn({ name: 'createdBy' })
  createdBy: User;

  @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
  subcategory: Subcategory;
  @JoinColumn()
  category: Subcategory;

  @ManyToOne(() => User, (user) => user.updatedBy, { eager: true })
  @JoinColumn({ name: 'updatedBy' })
  updatedBy: User;

  @Column({ type: 'timestamp', default: dayjs().format() })
  createdAt: string;

  @Column({ type: 'timestamp', default: dayjs().format() })
  updatedAt: string;
  //Falta image_id
}
