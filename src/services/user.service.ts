import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ManagementClient, User } from 'auth0';
import axios from 'axios';

@Injectable()
export class UserService {
  constructor(private readonly configService: ConfigService) {}

  async generateToken(code: string) {
    try {
      const response = await axios.post(
        `https://${this.configService.get<string>('auth.domain')}/oauth/token`,
        {
          grant_type: 'authorization_code',
          client_id: this.configService.get<string>('auth.clientId'),
          client_secret: this.configService.get<string>('auth.clientSecret'),
          code,
          redirect_uri: `${this.configService.get<string>('auth.audience')}`,
        },
      );

      return { data: response.data };
    } catch (er) {
      if (er.response) {
        return er.response;
      } else {
        return er;
      }
    }
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

  async registerUser(req: any): Promise<any> {
    const url = `https://${this.configService.get<string>(
      'auth.domain',
    )}/dbconnections/signup`;

    try {
      const response = await axios.post(url, req);

      return { data: response.data };
    } catch (er) {
      if (er.response) {
        return er.response;
      } else {
        return er;
      }
    }
  }
}
