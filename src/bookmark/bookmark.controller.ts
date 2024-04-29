import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookMarkService } from './bookmark.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { BookMarkDto } from 'src/auth/dto/bookmark.dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookMarkController {
  constructor(private readonly bookmarkService: BookMarkService) {}

  @Post('create-bookmark')
  createBookMark(@GetUser('id') userId: string, @Body() dto: BookMarkDto) {
    return this.bookmarkService.CreateBookMark(userId, dto);
  }

  @Patch(':id')
  updateBookMark(
    @Param('id') id: string,
    @GetUser('id') userId: string,
    @Body() dto: BookMarkDto,
  ) {
    return this.bookmarkService.updateBookMark(id, userId, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @GetUser('id') userId: string) {
    return this.bookmarkService.deleteBookMark(id, userId);
  }

  @Get('')
  getAllBookMarks(@GetUser('id') userId: string) {
    return this.bookmarkService.getAllBookMarks(userId);
  }
  @Get(':id')
  getSingleBookMark(@Param('id') id: string, @GetUser('id') userId: string) {
    return this.bookmarkService.getSingleBookMark(id, userId);
  }
}
