import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequest, CreateUserResponse, GetUserRequest } from 'src/protos/interface/users';
import { Response } from 'express';
import { EventGateWay } from 'src/utilities/event.gateway';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,
    private readonly eventGateway: EventGateWay) {}

  @Post('signup')
  async createUser(@Body() body: CreateUserRequest): Promise<any> {
    return  this.userService.createUser(body);
  }

  @Post('get')
  async getUser(@Body() body: GetUserRequest): Promise<any> {
    return this.userService.getUser(body);
  }

  @Post('login')
  async login(@Body() getUserRequest: GetUserRequest, @Res() res: Response) {
    try {
      const { token, message } = await this.userService.login(getUserRequest);

      // Set the token in the Authorization header
      res.setHeader('Authorization', `Bearer ${token}`);
      res.status(HttpStatus.OK).json({ message,token });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
    }
  }
}
