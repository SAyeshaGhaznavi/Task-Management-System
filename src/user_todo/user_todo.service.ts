import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserTodoDto } from './dto/create-user_todo.dto';
import { UpdateUserTodoDto } from './dto/update-user_todo.dto';

@Injectable()
export class UserTodoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserTodoDto: CreateUserTodoDto) {
    return this.prisma.user_todo.create({ 
      data: createUserTodoDto,
    });
  }

  findAll() {
    return this.prisma.user_todo.findMany();
  }

  findOne(user_id: number, todo_id:number) {
  return this.prisma.user_todo.findUnique({
    where: {
        user_id_todo_id: {
        user_id,
        todo_id,
      },
    },
  });
  
}

  update(user_id: number, todo_id: number, updateUserTodoDto: UpdateUserTodoDto) {
  return this.prisma.user_todo.update({
    where: {
      user_id_todo_id: {
        user_id,
        todo_id,
      },
    },
    data: updateUserTodoDto,
  });
}

  remove(user_id: number, todo_id:number) {
    return this.prisma.user_todo.delete({
    where: {
      user_id_todo_id: {
        user_id,
        todo_id,
      },
    },
  });
  }
}