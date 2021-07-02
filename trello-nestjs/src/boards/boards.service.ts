import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import * as boardsRepo from './board.memory.repository';

@Injectable()
export class BoardsService {
  create(createBoardDto: CreateBoardDto) {
    return boardsRepo.save(createBoardDto.title, createBoardDto.columns);
  }

  findAll() {
    return boardsRepo.getAll();
  }

  findOne(id: string) {
    return boardsRepo.getById(id);
  }

  update(id: string, updateBoardDto: UpdateBoardDto) {
    return boardsRepo.update(id, updateBoardDto.title, updateBoardDto.columns);
  }

  remove(id: string) {
    return boardsRepo.deleteBoard(id);
  }
}
