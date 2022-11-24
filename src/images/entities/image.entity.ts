import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../categories/entities';
import { Subcategory } from '../../subcategories/entities';

@Entity({ name: 'images' })
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  url: string;

  @OneToMany(() => Category, ({ image }) => image)
  category: Category;

  @OneToMany(() => Subcategory, ({ image }) => image)
  subcategory: Subcategory;
}
