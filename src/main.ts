import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  /**
   * Enable the database seeding from here if needed
   * just uncomment the commented lines
   */
  // const seedService = app.get(SeedService);
  // await seedService.seed();
  await app.listen(3000);
}
bootstrap();
