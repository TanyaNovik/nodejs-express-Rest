import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import * as tasksRepo from './task.memory.repository';

@Injectable()
export class TasksService {
  create(createTaskDto: CreateTaskDto, boardId) {
    return tasksRepo.save(
      createTaskDto.title,
      createTaskDto.order,
      createTaskDto.description,
      createTaskDto.userId,
      boardId,
      createTaskDto.columnId,
    );
  }

  findAll() {
    return tasksRepo.getAll();
  }

  findOne(id: string) {
    return tasksRepo.getById(id);
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return tasksRepo.update(
      id,
      updateTaskDto.title,
      updateTaskDto.order,
      updateTaskDto.description,
      updateTaskDto.userId,
      updateTaskDto.boardId,
      updateTaskDto.columnId,
    );
  }

  remove(id: string) {
    return tasksRepo.deleteTaskById(id);
  }
}
