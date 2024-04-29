import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { BookMarkController } from './bookmark/bookmark.controller';
import { BookMarkService } from './bookmark/bookmark.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    PrismaModule,
    JwtModule,
  ],
  controllers: [AppController, AuthController, BookMarkController],
  providers: [AppService, AuthService, BookMarkService],
})
export class AppModule {}
