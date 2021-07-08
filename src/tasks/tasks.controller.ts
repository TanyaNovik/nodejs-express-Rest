import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpException,
  HttpStatus,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { HttpExceptionFilter } from '../http-exception.filter';

@Controller('/boards/:boardId/tasks')
@UseGuards(JwtAuthGuard)
@UseFilters(new HttpExceptionFilter())
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @Param('boardId') boardId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.create(createTaskDto, boardId);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.tasksService.findOne(id);
    if (result !== null) {
      return result;
    }
    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.tasksService.remove(id);
    if (result === true) {
      return;
    }
    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }
}
