import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GpsModule } from './gps/gps.module';
import { TcpModule } from './tcp/tcp.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [GpsModule, TcpModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
