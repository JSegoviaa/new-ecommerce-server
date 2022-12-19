import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as dayjs from 'dayjs';
import { Product } from '../../products/entities';
@Entity({ name: 'tags' })
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @ManyToMany(() => Product, (product) => product.tag)
  @JoinTable({
    name: 'products_tags',
    joinColumn: { name: 'productId' },
    inverseJoinColumn: { name: 'tagId' },
  })
  product: Product[];

  @Column({ type: 'timestamp', default: dayjs().format() })
  createdAt: Date;
}
