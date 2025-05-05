import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GpsModule } from './gps/gps.module';
import { TcpModule } from './tcp/tcp.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './gps/entities/location.entity';
import { DeviceModule } from './device/device.module';
import { User } from './auth/entities/user.entity';
import { Device } from './device/entities/device.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'rastreador.db',
      entities: [Location, User, Device],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Location]),
    GpsModule,
    TcpModule,
    AuthModule,
    DeviceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
