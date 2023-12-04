import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const start = async () => {
  try {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 3010
    app.setGlobalPrefix('api');
    

    app.enableCors({
      origin: '*',
      methods: 'GET,PUT,POST,DELETE',
      allowedHeaders: 'Content-Type, Authorization',
      credentials: true,
      optionsSuccessStatus: 200,
    });

    const config = new DocumentBuilder()
      .setTitle('E-com')
      .setDescription('E-com app')
      .setVersion('1.0.0')
      .addTag('NodeJs, NestJS, Postgres, Swagger')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    
   
    await app.listen(PORT, () => {
      console.log(`Server ${PORT}-portda ishga tushdi`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
