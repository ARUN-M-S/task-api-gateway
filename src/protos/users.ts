// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.181.1
//   protoc               v3.20.3
// source: src/protos/users.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "users";

export interface GetUserRequest {
  name: string;
  email: string;
  password: string;
  createdDate: string;
  updatedDate: string;
}

export interface GetUserResponse {
  name: string;
  email: string;
  password: string;
  createdDate: string;
  updatedDate: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  createdDate: string;
  updatedDate: string;
}

export interface CreateUserResponse {
  name: string;
  email: string;
  password: string;
  createdDate: string;
  updatedDate: string;
}

export const USERS_PACKAGE_NAME = "users";

export interface UsersServiceClient {
  getUser(request: GetUserRequest): Observable<GetUserResponse>;

  createUser(request: CreateUserRequest): Observable<CreateUserResponse>;
}

export interface UsersServiceController {
  getUser(request: GetUserRequest): Promise<GetUserResponse> | Observable<GetUserResponse> | GetUserResponse;

  createUser(
    request: CreateUserRequest,
  ): Promise<CreateUserResponse> | Observable<CreateUserResponse> | CreateUserResponse;
}

export function UsersServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getUser", "createUser"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UsersService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UsersService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USERS_SERVICE_NAME = "UsersService";
