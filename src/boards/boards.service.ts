import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { getRepository, Repository } from 'typeorm';
import { BoardDB } from './entities/board.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardDB)
    private boardsRepository: Repository<BoardDB>,
  ) {}

  async create(createBoardDto: CreateBoardDto) {
    const newBoard = await this.boardsRepository.create(createBoardDto);
    await this.boardsRepository.save(newBoard);
    return newBoard;
  }

  async findAll() {
    const allBoards = await this.boardsRepository.find({ where: {} });
    return allBoards;
  }

  async findOne(id: string) {
    const findBoard = await this.boardsRepository.findOne(id);
    return findBoard ?? null;
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    let findBoard = await this.boardsRepository.findOne(id);
    if (findBoard === undefined) return null;
    await this.boardsRepository.update(id, updateBoardDto);
    findBoard = await this.boardsRepository.findOne(id);
    return findBoard ?? null;
  }

  async remove(id: string) {
    const deletedBoard = await this.boardsRepository.delete(id);
    if (deletedBoard.affected) {
      return true;
    }
    return false;
  }
}
