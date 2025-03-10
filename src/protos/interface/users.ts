// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.181.1
//   protoc               v3.20.3
// source: users.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "users";

export interface GetUserRequest {
  /** Added id field */
  id: string;
  name: string;
  email: string;
  password: string;
  createdDate: string;
  updatedDate: string;
}

export interface GetUserResponse {
  /** Added id field */
  id: string;
  name: string;
  email: string;
  password: string;
  createdDate: string;
  updatedDate: string;
}

export interface CreateUserRequest {
  /** Added id field */
  id: string;
  name: string;
  email: string;
  password: string;
  createdDate: string;
  updatedDate: string;
}

export interface CreateUserResponse {
  /** Added id field */
  id: string;
  name: string;
  email: string;
  password: string;
  createdDate: string;
  updatedDate: string;
}

export interface Task {
  /** Added id field */
  id: string;
  title: string;
  description: string;
  status: string;
  /** Added priority field */
  priority: string;
  /** Added userId field */
  userId: string;
}

export interface CreateTaskRequest {
  task: Task | undefined;
}

export interface CreateTaskResponse {
  task: Task | undefined;
}

export interface GetTaskRequest {
  /** Added id field */
  id: string;
}

export interface GetTaskResponse {
  task: Task | undefined;
}

export interface UpdateTaskRequest {
  task: Task | undefined;
}

export interface UpdateTaskResponse {
  task: Task | undefined;
}

export interface DeleteTaskRequest {
  /** Added id field */
  id: string;
}

export interface DeleteTaskResponse {
  success: boolean;
}

export interface GetAllTasksRequest {
  /** Added userId field to filter tasks by user */
  userId: string;
}

export interface GetAllTasksResponse {
  tasks: Task[];
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

export interface TaskServiceClient {
  createTask(request: CreateTaskRequest): Observable<CreateTaskResponse>;

  getTask(request: GetTaskRequest): Observable<GetTaskResponse>;

  updateTask(request: UpdateTaskRequest): Observable<UpdateTaskResponse>;

  deleteTask(request: DeleteTaskRequest): Observable<DeleteTaskResponse>;

  getAllTasks(request: GetAllTasksRequest): Observable<GetAllTasksResponse>;
}

export interface TaskServiceController {
  createTask(
    request: CreateTaskRequest,
  ): Promise<CreateTaskResponse> | Observable<CreateTaskResponse> | CreateTaskResponse;

  getTask(request: GetTaskRequest): Promise<GetTaskResponse> | Observable<GetTaskResponse> | GetTaskResponse;

  updateTask(
    request: UpdateTaskRequest,
  ): Promise<UpdateTaskResponse> | Observable<UpdateTaskResponse> | UpdateTaskResponse;

  deleteTask(
    request: DeleteTaskRequest,
  ): Promise<DeleteTaskResponse> | Observable<DeleteTaskResponse> | DeleteTaskResponse;

  getAllTasks(
    request: GetAllTasksRequest,
  ): Promise<GetAllTasksResponse> | Observable<GetAllTasksResponse> | GetAllTasksResponse;
}

export function TaskServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createTask", "getTask", "updateTask", "deleteTask", "getAllTasks"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("TaskService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("TaskService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const TASK_SERVICE_NAME = "TaskService";