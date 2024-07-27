import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { EventGateWay } from 'src/utilities/event.gateway';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'users',
          protoPath: join(__dirname, '../protos/users.proto'),
          url: 'localhost:50051', // Make sure this URL matches your gRPC server URL
        },
      },
    ]),
  ],
  providers: [TaskService,EventGateWay],
  controllers: [TaskController],
  exports: [TaskService], // Export UserService if used outside of this module
})
export class TaskModule {}
