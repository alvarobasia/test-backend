import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  deviceId: string;

  @Column({ type: 'datetime' })
  timestamp: Date;

  @Column('real')
  lat: number;

  @Column('real')
  lon: number;

  @Column()
  speed: number;

  @Column('real')
  direction: number;

  @Column()
  odo: number;

  @Column()
  horimeter: number;

  @Column()
  ignitionOn: boolean;

  @Column()
  gpsFix: boolean;

  @Column()
  historical: boolean;
}
