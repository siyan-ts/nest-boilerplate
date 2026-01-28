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
      const microserviceUrl =
        process.env.MICROSERVICE_URL || "http://localhost:3001"; // Updated to use MICROSERVICE_URL
      const response = await firstValueFrom(
        this.httpService.get(`${microserviceUrl}/greeting`),
      );
      return response.data;
    } catch (error) {
      return `Error connecting to microservice: ${error.message}`;
    }
  }
}
