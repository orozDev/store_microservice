import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order.module';
import { Transport } from '@nestjs/microservices';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    OrderModule,
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
    .setTitle('Order API service of store in microservices')
    .setDescription('The API description')
    .setVersion('1.0')
    .addServer('/api/order')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('/swagger', app, document);

  await app.startAllMicroservices();
  await app.listen(3003, 'order', () =>
    console.log('The server ORDER started at 3003'),
  );
}
bootstrap();
