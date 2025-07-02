import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTodoDto: CreateTodoDto) {
    return this.prisma.todo.create({ 
      data: createTodoDto,
    });
  }

  findAll() {
    return this.prisma.todo.findMany();
  }

  findOne(id: number) {
    return this.prisma.todo.findUnique({ where: { todo_id:id } });
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return this.prisma.todo.update({
      where: { todo_id:id },
      data: updateTodoDto,
    });
  }

  remove(id: number) {
    return this.prisma.todo.delete({ where: { todo_id:id } });
  }
}

