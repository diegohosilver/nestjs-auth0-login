import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  buildUniversalLoginUrl(
    domain: string,
    audience: string,
    clientId: string,
    callback: string,
  ): string {
    return `https://${domain}/authorize?audience=${audience}&scope=SCOPE&response_type=code&client_id=${clientId}&redirect_uri=${callback}/auth/token&state=STATE?prompt=none`;
  }
}
