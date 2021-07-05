import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { getRepository } from 'typeorm';
import { TaskDB } from './entities/task.entity';

@Injectable()
export class TasksService {
  async create(createTaskDto: CreateTaskDto, boardId) {
    const taskRepository = await getRepository(TaskDB);
    const newTask = await taskRepository.create({
      ...createTaskDto,
      boardId,
    });
    await taskRepository.save(newTask);
    return newTask;
  }

  async findAll() {
    const taskRepository = await getRepository(TaskDB);
    const allTasks = await taskRepository.find({
      where: {},
      loadRelationIds: true,
    });
    return allTasks;
  }

  async findOne(id: string) {
    const taskRepository = await getRepository(TaskDB);
    const findTask = await taskRepository.findOne({
      where: { id },
      loadRelationIds: true,
    });
    return findTask ?? null;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const taskRepository = await getRepository(TaskDB);
    const findTask = await taskRepository.findOne(id);
    if (findTask === undefined) return null;
    await taskRepository.update(id, updateTaskDto);
    const newTask = await taskRepository.findOne(id);
    return newTask ?? null;
  }

  async remove(id: string) {
    const taskRepository = await getRepository(TaskDB);
    const deletedTask = await taskRepository.delete(id);
    if (deletedTask.affected) {
      return true;
    }
    return false;
  }

  async anonymizeAssignee(userId: string) {
    const taskRepository = await getRepository(TaskDB);
    await taskRepository.update({ userId }, { userId: null });
  }
}
