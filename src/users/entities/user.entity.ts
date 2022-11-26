import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as dayjs from 'dayjs';

import { Role } from '../../roles/entities';
import { Category } from '../../categories/entities';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column()
  password: string;

  @Column({
    type: 'timestamp',
    default: dayjs().format(),
  })
  createdAt: string;

  @Column({
    type: 'timestamp',
    default: dayjs().format(),
  })
  updatedAt: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ManyToOne(() => Role, (role) => role.user, { eager: true })
  role: Role;

  @OneToMany(() => Category, (category) => category.createdBy)
  createdBy: Category;

  @OneToMany(() => Category, (category) => category.updatedBy)
  updatedBy: Category;
}
