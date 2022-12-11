import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'variant_options' })
export class VariantOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0, type: 'float' })
  price: number;

  @Column({ default: 0, type: 'float' })
  grams: number;

  @Column({ default: 0, type: 'float' })
  milimeters: number;

  @Column({ default: 0, type: 'float' })
  length: number;

  @Column({ default: 0, type: 'float' })
  width: number;

  @Column({ default: 0, type: 'float' })
  height: number;

  @Column({ default: 0, type: 'float' })
  diameter: number;
}
