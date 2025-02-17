import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ProductModule } from './product.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    ProductModule,
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
    .setTitle('Product API service of store in microservices')
    .setDescription('The API description')
    .setVersion('1.0')
    .addServer('/api/product')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('/swagger', app, document);

  await app.startAllMicroservices();
  await app.listen(3002, 'product', () =>
    console.log('The server PRODUCT started at 3002'),
  );
}
bootstrap();
