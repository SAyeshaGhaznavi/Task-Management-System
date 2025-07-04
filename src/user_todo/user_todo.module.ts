import { Module } from '@nestjs/common';
import { UserTodoService } from './user_todo.service';
import { UserTodoController } from './user_todo.controller';
import { EventsModule } from '../events/events.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [EventsModule],
  controllers: [UserTodoController],
  providers: [UserTodoService, PrismaService],
})
export class UserTodoModule {}
