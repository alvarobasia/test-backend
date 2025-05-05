import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from './entities/device.entity';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private deviceRepo: Repository<Device>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async registerDevice(deviceId: string, userId: number) {
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!user) throw new Error('User not found');

    const device = this.deviceRepo.create({ deviceId, owner: user });
    return this.deviceRepo.save(device);
  }

  async isDeviceOwnedByUser(deviceId: string, userId: number): Promise<boolean> {
    const device = await this.deviceRepo.findOne({
      where: { deviceId },
      relations: ['owner'],
    });

    return device?.owner?.id === userId;
  }
}
