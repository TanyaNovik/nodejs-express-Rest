import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardDB } from './entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoardDB])],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
