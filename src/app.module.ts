// src/app.module.ts
import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import { AuthMiddleware } from './auth/auth.middleware';
import { CacheModule } from './cache/cache.module';
import { EventGateWay } from './utilities/event.gateway';


@Module({
  imports: [
    NestCacheModule.register({
      max: 100,
      ttl: 0, // Time-to-live in seconds
      isGlobal: true,
      //store:redisStore,
      host:'http://localhost:4000',
      port:'6379'
    }),
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'users',
          protoPath: join(__dirname, 'protos/users.proto'),
          url: 'localhost:50051',
        },
      },
    ]),
    UserModule,
    TaskModule,
    CacheModule
  ],
  controllers: [AppController, TaskController],
  providers: [AppService, TaskService,EventGateWay],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(TaskController);
  }
}
