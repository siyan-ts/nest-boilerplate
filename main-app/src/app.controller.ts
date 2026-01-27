import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hello-from-ms')
  async getHelloFromMs(): Promise<string> {
    return this.appService.getHelloFromMicroservice();
  }
}
