import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  // Enable validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Global prefix for API
  app.setGlobalPrefix('api');

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('NestJS Supabase Auth API')
    .setDescription('A complete authentication API built with NestJS and Supabase')
    .setVersion('1.0')
    .addTag('auth', 'Authentication endpoints')
    .addTag('app', 'Application endpoints')
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

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'NestJS Supabase Auth API Docs',
    customfavIcon: 'https://nestjs.com/img/logo_text.svg',
    customCss: `
      .topbar-wrapper .link {
        content: url('https://nestjs.com/img/logo_text.svg');
        width: 120px;
        height: auto;
      }
      .swagger-ui .topbar { background-color: #E0234E; }
    `,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}/api`);
  console.log(`📚 Swagger docs available at: http://localhost:${port}/api/docs`);
}
bootstrap();
