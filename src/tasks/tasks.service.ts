import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { getRepository, Repository } from 'typeorm';
import { TaskDB } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskDB)
    private tasksRepository: Repository<TaskDB>,
  ) {}
  async create(createTaskDto: CreateTaskDto, boardId) {
    const newTask = await this.tasksRepository.create({
      ...createTaskDto,
      boardId,
    });
    await this.tasksRepository.save(newTask);
    return newTask;
  }

  async findAll() {
    const allTasks = await this.tasksRepository.find({
      where: {},
      loadRelationIds: true,
    });
    return allTasks;
  }

  async findOne(id: string) {
    const findTask = await this.tasksRepository.findOne({
      where: { id },
      loadRelationIds: true,
    });
    return findTask ?? null;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const findTask = await this.tasksRepository.findOne(id);
    if (findTask === undefined) return null;
    await this.tasksRepository.update(id, updateTaskDto);
    const newTask = await this.tasksRepository.findOne(id);
    return newTask ?? null;
  }

  async remove(id: string) {
    const deletedTask = await this.tasksRepository.delete(id);
    if (deletedTask.affected) {
      return true;
    }
    return false;
  }

  async anonymizeAssignee(userId: string) {
    await this.tasksRepository.update({ userId }, { userId: null });
  }
}
