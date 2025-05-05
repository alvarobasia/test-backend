import { InjectRepository } from '@nestjs/typeorm';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { DeviceService } from '../device/device.service';

@Injectable()
export class GpsService {
  constructor(
    @InjectRepository(Location)
    private locationRepo: Repository<Location>,
    private deviceService: DeviceService
  ) {}

  async saveLocation(data: Partial<Location>) {
    const location = this.locationRepo.create(data);
    return this.locationRepo.save(location);
  }

  async getLastLocation(deviceId: string) {
    return this.locationRepo.findOne({
      where: { deviceId },
      order: { timestamp: 'DESC' },
    });
  }

  async getLastLocationForUser(deviceId: string, userId: number) {
    const isOwner = await this.deviceService.isDeviceOwnedByUser(
      deviceId,
      userId,
    );
    if (!isOwner)
      throw new ForbiddenException('Você não tem acesso a este dispositivo.');

    return this.locationRepo.findOne({
      where: { deviceId },
      order: { timestamp: 'DESC' },
    });
  }
}
