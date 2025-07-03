import { Injectable, ForbiddenException } from '@nestjs/common';
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

  async update(id: number, updateTodoDto: UpdateTodoDto, userid:number ) {
    // const taskf=await this.prisma.todo.findUnique({
    //   where: {todo_id:id,},
    // });

    // const projectf=await this.prisma.task.findUnique({
    //   where: {task_id:taskf?.task_id,},
    // });    

    const userToTODO=await this.prisma.user_todo.findUnique({
    where: {
        user_id_todo_id: {
        user_id:userid,
        todo_id:id,
      },
    },
  });

    if(!userToTODO)
    {
      throw new ForbiddenException("You are not authorized to update this TODO");
    }
    return this.prisma.todo.update({
      where: { todo_id:id },
      data: updateTodoDto,
    });
  }

  async remove(id: number, userid:number) {
    const userToTODO=await this.prisma.user_todo.findUnique({
    where: {
        user_id_todo_id: {
        user_id:userid,
        todo_id:id,
      },
    },
  });

    if(!userToTODO)
    {
      throw new ForbiddenException("You are not authorized to delete this TODO");
    }

    return this.prisma.todo.delete({ where: { todo_id:id } });
  }
}

