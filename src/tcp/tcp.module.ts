import { Module } from '@nestjs/common';
import { TcpService } from './tcp.service';
import { GpsModule } from '../gps/gps.module';

@Module({
  imports: [GpsModule], // <- isso resolve a dependência
  providers: [TcpService],
})
export class TcpModule {}
