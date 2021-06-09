import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import appConfig from './config/app.config';
import { AuthModule } from './controllers/auth/auth.module';
import { AppController } from './app.controller';
import { UserModule } from './controllers/user/user.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    AuthModule,
	UserModule,
	ServicesModule
  ],
  controllers: [AppController]
})
export class AppModule {}
