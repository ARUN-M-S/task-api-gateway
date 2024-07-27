import { BadRequestException, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateUserRequest, CreateUserResponse, GetUserRequest, GetUserResponse, UsersServiceClient } from 'src/protos/interface/users';
import { TokenService } from 'src/utilities/token.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService implements OnModuleInit {
  private usersService: UsersServiceClient;

  constructor(
    @Inject('USERS_SERVICE') private readonly client: ClientGrpc,
    private readonly tokenService: TokenService
  ) {}

  onModuleInit() {
    this.usersService = this.client.getService<UsersServiceClient>('UsersService');
  }

  // Method to handle user signup
  async createUser(createUserRequest: CreateUserRequest): Promise<any> {
    const getUserRequest : GetUserRequest = {} as GetUserRequest
    getUserRequest.email = createUserRequest.email
    const userResponse = await new Promise<GetUserResponse>((resolve, reject) => {
      this.getUser(getUserRequest).subscribe({
        next: (response) => resolve(response),
        error: (err) => reject(err),
      });
    });

    if(userResponse.email != null && userResponse.email != undefined && userResponse.email != ''){
      throw new BadRequestException('User already exist');
    }

    return this.usersService.createUser(createUserRequest);
  }

  // Method to handle user login
  getUser(getUserRequest: GetUserRequest): Observable<GetUserResponse> {

    return this.usersService.getUser(getUserRequest);
  }

  async login(getUserRequest: GetUserRequest): Promise<any> {
    try {
      // Convert Observable to Promise
      const userResponse = await new Promise<GetUserResponse>((resolve, reject) => {
        this.getUser(getUserRequest).subscribe({
          next: (response) => resolve(response),
          error: (err) => reject(err),
        });
      });
  
      if (userResponse) {
        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(getUserRequest.password, userResponse.password);
  
        if (isMatch) {
          // Generate token with user ID and email
          const token = this.tokenService.generateToken({
            email: getUserRequest.email,
            userId: userResponse.id, // Include user ID in the payload
          });
          return { message: 'Login successful', token }; // Use return here
        } else {
          throw new BadRequestException('Invalid credentials'); // Use throw for errors
        }
      } else {
        throw new BadRequestException('User not found'); // Use throw for errors
      }
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error.message || 'Login failed'); // Use throw to propagate errors
    }
  }
  

    
  
}
