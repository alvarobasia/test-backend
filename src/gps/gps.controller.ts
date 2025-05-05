import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { GpsService } from './gps.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Request } from 'express';
import { User } from '../auth/entities/user.entity';

@Controller('gps')
export class GpsController {
  constructor(private readonly gpsService: GpsService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':deviceId')
  async getLastLocation(@Param('deviceId') id: string, @Req() req: Request) {
    return this.gpsService.getLastLocationForUser(
      id,
      (req.user as User).id,
    );
  }
}
