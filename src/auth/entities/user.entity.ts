import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Device } from '../../device/entities/device.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Device, (device) => device.owner)
  devices: Device[];
}
