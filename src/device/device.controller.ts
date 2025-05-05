import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { DeviceService } from './device.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';


@Controller('device')
export class DeviceController {
  constructor(private deviceService: DeviceService) {}

  @UseGuards(JwtAuthGuard)
  @Post('register')
  async registerDevice(@Body('deviceId') deviceId: string, @Request() req) {
    return this.deviceService.registerDevice(deviceId, req.user.userId);
  }
}
