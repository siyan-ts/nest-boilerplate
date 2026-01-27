import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getGreeting(): string {
    const envMessage = process.env.FROM_MICROSERVICE || 'from microservice';
    return `hello ${envMessage}`;
  }
}
