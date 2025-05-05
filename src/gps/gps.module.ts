import { Module } from '@nestjs/common';
import { GpsService } from './gps.service';
import { GpsController } from './gps.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceModule } from '../device/device.module';
import { Location } from './entities/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Location]), DeviceModule],
  providers: [GpsService],
  controllers: [GpsController],
  exports: [GpsService],
})
export class GpsModule {}
