import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { Transport } from '@nestjs/microservices';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AuthModule,
    new FastifyAdapter(),
  );
  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      host: 'redis',
      port: 6379,
    },
  });

  const swagger = new DocumentBuilder()
    .setTitle('Auth API service of store in microservices')
    .setDescription('The API description')
    .setVersion('1.0')
    .addServer('/api/auth')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('/swagger', app, document);

  await app.startAllMicroservices();
  await app.listen(3001, 'auth', () =>
    console.log('The server AUTH started at 3001'),
  );
}

bootstrap();
