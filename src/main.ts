import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);

  /**
   * Enable the database seeding from here if needed
   * just uncomment the commented lines
   */
  // const seedService = app.get(SeedService);
  // await seedService.seed();
  await app.listen(configService.get<number>('port'));
}
bootstrap();
