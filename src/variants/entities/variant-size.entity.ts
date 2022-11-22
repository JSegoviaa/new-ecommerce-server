import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'variant_sizes' })
export class VariantSize {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  short: string;
}
