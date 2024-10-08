import { Inject, Injectable } from '@nestjs/common';
import { DevConfigService } from './common/providers/DevConfigService';

@Injectable()
export class AppService {
  constructor(
    private devConfigService: DevConfigService,
    @Inject('CONFIG') private config: { port: string },
  ) {}
  getHello(): Record<string, any> {
    return {
      message: `App is Healthy and running ${this.devConfigService.getDBHOST()} port : ${this.config.port}`,
    };
  }
}
