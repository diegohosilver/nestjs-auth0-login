import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ManagementClient, User } from 'auth0';
import axios from 'axios';

@Injectable()
export class UserService {

	constructor(private readonly configService: ConfigService) {}

	async generateToken(code: string) {
		return await axios.post(
			`https://${this.configService.get<string>('auth.domain')}/oauth/token`,
			{
			  grant_type: 'authorization_code',
			  client_id: this.configService.get<string>('auth.clientId'),
			  client_secret: this.configService.get<string>('auth.clientSecret'),
			  code: code,
			  redirect_uri: `${this.configService.get<string>('auth.audience')}`,
			},
		  );
	}

	async getUser(req: any): Promise<User> {
		const authZero = new ManagementClient({
			domain: this.configService.get<string>('auth.domain'),
			clientId: this.configService.get<string>('auth.clientId'),
			clientSecret: this.configService.get<string>('auth.clientSecret'),
			scope: 'read:users update:users',
		  });
	  
		return await authZero
				.getUser({ id: req.user.sub })
				.then((user: User) => {
					return user;
				})
				.catch((err) => {
					return err;
				});
	}
}