import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { join } from 'path';
import { TokenService } from 'src/utilities/token.service';
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
  providers: [UserService,TokenService,EventGateWay],
  controllers: [UserController],
  exports: [UserService,TokenService], // Export UserService if used outside of this module
})
export class UserModule {}
