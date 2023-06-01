import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../categories/entities';
import { Subcategory } from '../../subcategories/entities';
import { VariantOption } from '../../variants/variant-options/entities';

@Entity({ name: 'images' })
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  url: string;

  @Column({ nullable: true })
  version: number;

  @OneToMany(() => Category, ({ image }) => image)
  category: Category;

  @OneToMany(() => Subcategory, ({ image }) => image)
  subcategory: Subcategory;

  @ManyToMany(() => VariantOption, (variantOption) => variantOption.images)
  variantOptions: VariantOption[];
}
