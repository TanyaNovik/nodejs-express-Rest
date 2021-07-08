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
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { HttpExceptionFilter } from '../http-exception.filter';

@Controller('boards')
@UseFilters(new HttpExceptionFilter())
@UseGuards(JwtAuthGuard)
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }

  @Get()
  findAll() {
    return this.boardsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.boardsService.findOne(id);
    if (result !== null) {
      return result;
    }
    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardsService.update(id, updateBoardDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.boardsService.remove(id);
    if (result === true) {
      return;
    }
    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
  }
}
