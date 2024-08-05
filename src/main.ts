import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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

  /**
   * Setup the Swagger api for documentation
   */
  const config = new DocumentBuilder()
    .setTitle('Nest API')
    .setDescription('Nest demo api for practice and api documentation')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  // http://localhost:3001/api/documentation
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/documentation', app, document);

  await app.listen(configService.get<number>('port'));
}
bootstrap();
