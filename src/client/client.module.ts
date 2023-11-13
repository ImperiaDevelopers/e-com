import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Client } from './models/client.model';
import { JwtModule } from '@nestjs/jwt';
import { Otp } from '../otp/models/otp.model';
import { OtpModule } from '../otp/otp.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Client, Otp]),
    JwtModule.register({}),
    OtpModule,
  ],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
