import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'variant_colors' })
export class VariantColor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  color: string;
}
