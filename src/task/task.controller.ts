import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseInterceptors } from '@nestjs/common';
import { CreateTaskRequest, DeleteTaskRequest, GetAllTasksRequest, GetTaskRequest, UpdateTaskRequest } from 'src/protos/interface/users';
import { TaskService } from './task.service';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { Request } from 'express';
import { EventGateWay } from 'src/utilities/event.gateway';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService, private readonly eventGateway: EventGateWay) {}

  @Post('create')
  async createTask(@Body() body: CreateTaskRequest,@Req() req:Request): Promise<any> {

    body.task.userId = req.user?.userId
    let resposne=  await  this.taskService.createTask(body);
    
     this.eventGateway.sendTaskUpdate(resposne)
    return resposne
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() body: UpdateTaskRequest): Promise<any> {
   console.log(body,"body");
   
    body.task.id = id; 
    return this.taskService.updateTask(body);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<any> {
    const deleteTaskRequest: DeleteTaskRequest = { id };
    return this.taskService.deleteTask(deleteTaskRequest);
  }

  @Get(':id')
  async getTask(@Param('id') id: string): Promise<any> {
    const getTaskRequest: GetTaskRequest = { id };
    return this.taskService.getTask(getTaskRequest);
  }

  @Get()
//   @CacheKey("tasks")
//   @UseInterceptors(CacheInterceptor)
  async getAllTask(@Req() req:Request): Promise<any> {
    const getAllTasksRequest: GetAllTasksRequest = { userId: req?.user?.userId };
    return this.taskService.getAllTasks(getAllTasksRequest);
  }
}
