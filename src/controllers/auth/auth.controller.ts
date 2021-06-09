import {
	Controller,
	Get,
	Post,
	Query,
	Request,
	Redirect
  } from '@nestjs/common';
  import { ConfigService } from '@nestjs/config';
  import { AppService } from '../../services/app.service';
  import { UserService } from '../../services/user.service';
  
  @Controller('auth')
  export class AuthController {
	constructor(
	  private readonly appService: AppService,
	  private readonly configService: ConfigService,
	  private readonly userService: UserService
	) {}
  
	@Get('login')
	@Redirect('', 302)
	getLogin() {
	  return {
		url: this.appService.buildUniversalLoginUrl(
		  this.configService.get<string>('auth.domain'),
		  this.configService.get<string>('auth.audience'),
		  this.configService.get<string>('auth.clientId'),
		  this.configService.get<string>('auth.audience'),
		),
	  };
	}
  
	@Get('token')
	async generateToken(@Query() query) {
	  return await this.userService.generateToken(query.code);
	}

	@Post('register')
	async registerUser(@Request() req) {
		let body = req.body;

		let data = {
			client_id: this.configService.get<string>('auth.clientId'),
			email: body.email,
			password: body.password,
			connection: this.configService.get<string>('auth.connection'),
			name: body.name,
			nickname: body.nickname,
			picture: body.picture
		}

		return await this.userService.registerUser(data);	
	}
  }
  