import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS para recibir peticiones de Vue
  app.enableCors({
    origin: 'http://localhost:5173',
  });

  // Habilitar validaciones globales automáticas según los DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Ignora datos no declarados en el DTO
      forbidNonWhitelisted: true, // Lanza error si envían datos extra no permitidos
      transform: true, // Transforma tipos automáticamente (strings a números, etc.)
    }),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`API escuchando en http://localhost:${port}`);
}
bootstrap();