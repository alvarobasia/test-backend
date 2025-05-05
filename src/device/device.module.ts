import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { Device } from './entities/device.entity';
import { User } from '../auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Device, User])],
  providers: [DeviceService],
  controllers: [DeviceController],
  exports: [DeviceService],
})
export class DeviceModule {}
