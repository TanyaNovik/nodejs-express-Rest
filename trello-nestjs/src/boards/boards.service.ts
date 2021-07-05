import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { getRepository } from 'typeorm';
import { BoardDB } from './entities/board.entity';

@Injectable()
export class BoardsService {
  async create(createBoardDto: CreateBoardDto) {
    const boardRepository = await getRepository(BoardDB);
    const newBoard = await boardRepository.create(createBoardDto);
    await boardRepository.save(newBoard);
    return newBoard;
  }

  async findAll() {
    const boardRepository = await getRepository(BoardDB);
    const allBoards = await boardRepository.find({ where: {} });
    return allBoards;
  }

  async findOne(id: string) {
    const boardRepository = await getRepository(BoardDB);
    const findBoard = await boardRepository.findOne(id);
    return findBoard ?? null;
  }

  async update(id: string, updateBoardDto: UpdateBoardDto) {
    const boardRepository = await getRepository(BoardDB);
    let findBoard = await boardRepository.findOne(id);
    if (findBoard === undefined) return null;
    await boardRepository.update(id, updateBoardDto);
    findBoard = await boardRepository.findOne(id);
    return findBoard ?? null;
  }

  async remove(id: string) {
    const boardRepository = await getRepository(BoardDB);
    const deletedBoard = await boardRepository.delete(id);
    if (deletedBoard.affected) {
      return true;
    }
    return false;
  }
}
