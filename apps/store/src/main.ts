import { NestFactory } from '@nestjs/core';
import { StoreModule } from './store.module';
import { Transport } from '@nestjs/microservices';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    StoreModule,
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
    .setTitle('Store API service of store in microservices')
    .setDescription('The API description')
    .setVersion('1.0')
    .setBasePath('/api/store')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('/swagger', app, document);

  await app.startAllMicroservices();
  await app.listen(3000, 'store', () =>
    console.log('The server STORE started at 3000'),
  );
}
bootstrap();
