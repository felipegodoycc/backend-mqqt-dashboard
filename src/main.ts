import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ cors: true}); 
  // app.enableCors({
  //   origin: "*",
  //   methods: "GET,PUT,POST,DELETE,OPTIONS",
  //   allowedHeaders: "Authorization, Origin, X-Requested-With, Content-Type, Accept",
  // });
  app.setGlobalPrefix('api/v1');
  const configService: ConfigService = app.get(ConfigService);
  
  // if(configService.get('SWAGGER') === 'true')
  // {
  //   const options = new DocumentBuilder()
  //   .setTitle('Resource Manager V3')
  //   .setDescription('RMv3 API description')
  //   .setVersion('1.0')
  //   .setBasePath('api/v1')
  //   .build();

  //   const document = SwaggerModule.createDocument(app, options);
  //   SwaggerModule.setup('swagger', app, document);
  // }

  await app.listen(configService.get('PORT'));
}
bootstrap();
