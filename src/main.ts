import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
<<<<<<< HEAD

const start = async () => {
  try {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 3010
    app.setGlobalPrefix('api');
    
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
=======
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

const start = async () => {
  try {
    const PORT = process.env.PORT || 3300;

    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');

    const config = new DocumentBuilder()
      .setTitle('ERP')
      .setDescription('A project named ERP by Imperia Developers')
      .setVersion('1.0.0')
      .addTag('NestJS, Postgres, Sequelize, Vuejs, TailwindCss')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
>>>>>>> 9cc78294f3166cd8657cd6ee996525b1c800e339
    });
  } catch (error) {
    console.log(error);
  }
};
<<<<<<< HEAD

=======
>>>>>>> 9cc78294f3166cd8657cd6ee996525b1c800e339
start();
