import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as dayjs from 'dayjs';
@Entity({ name: 'tags' })
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ type: 'timestamp', default: dayjs().format() })
  createdAt: Date;
}
