import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  deviceId: string;

  @ManyToOne(() => User, (user) => user.devices)
  owner: User;
}
