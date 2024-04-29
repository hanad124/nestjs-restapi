import { Module } from '@nestjs/common';
import { BookMarkController } from './bookmark.controller';

@Module({
  controllers: [BookMarkController],
})
export class BookMarkModule {}
