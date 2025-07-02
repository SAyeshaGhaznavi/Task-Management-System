import { Module } from '@nestjs/common';
import { UserTodoService } from './user_todo.service';
import { UserTodoController } from './user_todo.controller';

@Module({
  controllers: [UserTodoController],
  providers: [UserTodoService],
})
export class UserTodoModule {}
