import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [ServicesModule],
  controllers: [UserController]
})
export class UserModule {}
