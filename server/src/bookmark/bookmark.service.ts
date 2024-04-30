import { ForbiddenException, Injectable } from '@nestjs/common';
import { BookMarkDto } from 'src/auth/dto/bookmark.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookMarkService {
  constructor(private prismaService: PrismaService) {}

  async CreateBookMark(userId: string, dto: BookMarkDto) {
    const bookmark = await this.prismaService.bookMark.create({
      data: {
        title: dto.title,
        description: dto.description,
        link: dto.link,
        userId: userId,
      },
    });

    if (!bookmark) {
      throw new ForbiddenException('Bookmark Creatioin Fieled!');
    }

    return {
      msg: bookmark,
    };
  }

  async updateBookMark(id: string, userId: string, dto: BookMarkDto) {
    const existBookmar = await this.prismaService.bookMark.findUnique({
      where: {
        id: id,
      },
    });

    if (!existBookmar) {
      throw new ForbiddenException("Bookmark Doesn't exist!");
    }

    const bookmark = await this.prismaService.bookMark.update({
      where: {
        id: id,
      },
      data: {
        title: dto.title,
        description: dto.description,
        link: dto.link,
        userId: userId,
      },
    });

    if (!bookmark) {
      throw new ForbiddenException('Bookmark update failed');
    }

    return {
      data: bookmark,
    };
  }

  async deleteBookMark(id: string, userId: string) {
    const existBookmark = await this.prismaService.bookMark.findUnique({
      where: {
        id: id,
      },
    });

    if (!existBookmark) {
      throw new ForbiddenException("Book Mark Doesn't exist!");
    }

    await this.prismaService.bookMark.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Book Mark Deleted Successfully!',
    };
  }

  async getAllBookMarks(userId: string) {
    const bookmarks = await this.prismaService.bookMark.findMany({
      where: {
        userId,
      },
    });

    if (bookmarks.length == 0) {
      throw new ForbiddenException('there is no bookmaks');
    }

    return {
      data: bookmarks,
    };
  }

  async getSingleBookMark(id: string, userId: string) {
    const bookmark = await this.prismaService.bookMark.findUnique({
      where: {
        id,
        userId,
      },
    });

    if (!bookmark) {
      throw new ForbiddenException('No Book Mark');
    }

    return {
      data: bookmark,
    };
  }
}
