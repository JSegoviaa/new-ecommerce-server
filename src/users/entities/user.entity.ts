import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import * as dayjs from 'dayjs';

import { Role } from '../../roles/entities';

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

  @Column({ unique: true, nullable: true })
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
}
