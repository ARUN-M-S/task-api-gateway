import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Cache } from 'cache-manager';
import { Observable } from 'rxjs';
import { 
  CreateTaskRequest,
  CreateTaskResponse,
  DeleteTaskRequest,
  DeleteTaskResponse,
  GetAllTasksRequest,
  GetAllTasksResponse,
  GetTaskRequest,
  GetTaskResponse,
  TaskServiceClient,
  UpdateTaskRequest,
  UpdateTaskResponse
} from 'src/protos/interface/users';
import { Status } from 'src/types/enum';
import { EventGateWay } from "src/utilities/event.gateway";


@Injectable()
export class TaskService implements OnModuleInit {

  private taskService: TaskServiceClient;

  constructor(
    @Inject('USERS_SERVICE') private readonly client: ClientGrpc,  
  private readonly eventGateway: EventGateWay

  ) {}

  onModuleInit() {
    this.taskService = this.client.getService<TaskServiceClient>('TaskService');
  }

  // Method to handle task creation
   createTask(createTaskRequest: CreateTaskRequest): Observable<CreateTaskResponse> {
  const data = this.taskService.createTask(createTaskRequest);
 
   
   return data
  }

  // Method to handle task update
  updateTask(updateTaskRequest: UpdateTaskRequest): Observable<UpdateTaskResponse> {
    return this.taskService.updateTask(updateTaskRequest);
  }

  // Method to handle task deletion
  deleteTask(deleteTaskRequest: DeleteTaskRequest): Observable<DeleteTaskResponse> {
    return this.taskService.deleteTask(deleteTaskRequest);
  }

  // Method to get a single task
  getTask(getTaskRequest: GetTaskRequest): Observable<GetTaskResponse> {
    return this.taskService.getTask(getTaskRequest);
  }

  // Method to get all tasks
  async getAllTasks(getAllTasksRequest: GetAllTasksRequest): Promise<any> {
  let obj = await  new Promise<any>((resolve, reject) => {
        this.getAllTask(getAllTasksRequest).subscribe({
          next: (response) => resolve(response),
          error: (err) => reject(err),
        });
      });
  let tasks = obj?.tasks
  
  //  // Ensure method name matches .proto definition
   const response = [
    {
      name: "To Do",
      items: tasks.filter(task => task.status == Status.Todo).map(task => ({
        id: task.id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: "To Do"
      }))
    },
    {
      name: "In Progress",
      items: tasks.filter(task => task.status == Status.InProgress).map(task => ({
        id: task.id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: "In Progress"
      }))
    },
    {
      name: "In Preview",
      items: tasks.filter(task => task.status == Status.InPreview).map(task => ({
        id: task.id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: "In Preview"
      }))
    },
    {
      name: "Done",
      items: tasks.filter(task => task.status == Status.Done).map(task => ({
        id: task.id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: "Done"
      }))
    }
   
  ];

  return response;
  }
   getAllTask(getAllTasksRequest: GetAllTasksRequest): Observable<GetAllTasksResponse>{
    return this.taskService.getAllTasks(getAllTasksRequest); 
  }
}
