import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment';
import { Post } from 'src/entities/post';
import { User } from 'src/entities/user';
import { PostController } from './controllers/api/post.controller';
import { UserController } from './controllers/api/user.controller';
import { CommentController } from './controllers/api/comment.controller';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { CommentService } from './services/comment.service';
import { PostService } from './services/post.service';
import { UserService } from './services/user.service';
import { AuthController } from './controllers/api/auth.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { HttpsRedirectMiddleware } from '@kittgen/nestjs-https-redirect';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async(configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: 3306,
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),
        database: configService.get('DB_NAME'),
        entities: [
          User,
          Post,
          Comment,
        ]
      }),
      inject: [ConfigService]
    }),
    TypeOrmModule.forFeature([
      User,
      Post,
      Comment,
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  controllers: [
    AppController,
    UserController,
    PostController,
    CommentController,
    AuthController,
  ],
  providers: [
    AppService,
    UserService,
    PostService,
    CommentService,
  ],
  exports: [
    UserService,
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude("auth/*")
      .forRoutes("api/*");
  }
}
