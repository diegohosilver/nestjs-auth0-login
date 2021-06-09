import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { UserService } from './user.service';

@Module({
  providers: [AppService, UserService, ConfigService],
  exports: [AppService, UserService, ConfigService]
})
export class ServicesModule {}
