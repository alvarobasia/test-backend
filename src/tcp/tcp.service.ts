import { Injectable, OnModuleInit } from '@nestjs/common';
import { createServer, Socket } from 'net';
import { parseGpsPacket } from './parser';
import { GpsService } from '../gps/gps.service';

@Injectable()
export class TcpService implements OnModuleInit {
  private server: any;

  constructor(private readonly gpsService: GpsService) {}

  onModuleInit() {
    this.server = createServer(this.handleConnection.bind(this));
    this.server.listen(5001, () => {
      console.log('[TCP] Servidor rodando na porta 5001');
    });
  }

  handleConnection(socket: Socket) {
    socket.on('data', async (data: Buffer) => {
      console.log(data);
      const hex = data.toString('hex').toUpperCase();
      console.log(hex);
      const location = parseGpsPacket(hex);
      console.log(location);
      if (location) {
        await this.gpsService.saveLocation({
          ...location,
          deviceId: this.extractId(hex),
        });
      }
    });
  }

  private extractId(hex: string) {
    return parseInt(hex.slice(4, 10), 16).toString();
  }
}
