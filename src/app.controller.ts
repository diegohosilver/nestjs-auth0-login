import {
  Controller,
  Get,
  UseGuards,
  Request,
  Query,
  Redirect,
  Post,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // For testing purposes
  @UseGuards(AuthGuard('jwt'))
  @Get('protected')
  getProtected(): string {
    return 'This route is protected.';
  }
}
