import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  getHello(): string {
    const envMessage = process.env.FROM_MAIN || 'from main';
    return `hello ${envMessage}`;
  }

  async getHelloFromMicroservice(): Promise<string> {
    try {
      const microserviceHost = process.env.MICROSERVICE_HOST || 'localhost';
      const microservicePort = process.env.MICROSERVICE_PORT || '3001';
      const microserviceUrl = `http://${microserviceHost}:${microservicePort}`;
      const response = await firstValueFrom(
        this.httpService.get(`${microserviceUrl}/greeting`)
      );
      return response.data;
    } catch (error) {
      return `Error connecting to microservice: ${error.message}`;
    }
  }
}
