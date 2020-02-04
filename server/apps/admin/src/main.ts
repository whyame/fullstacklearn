import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Full Stack 后台管理界面API')
    .setDescription('供后台管理界面API文档')
    .setVersion('1.0')
    // .addTag('nestjs')  这个是新增一个标签组。。。没发现用处
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
  console.log('http://localhost:3000/api-docs')
}
bootstrap();
