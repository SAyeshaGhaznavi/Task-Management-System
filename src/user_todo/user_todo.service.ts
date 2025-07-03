import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserTodoDto } from './dto/create-user_todo.dto';
import { UpdateUserTodoDto } from './dto/update-user_todo.dto';

@Injectable()
export class UserTodoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserTodoDto: CreateUserTodoDto) {
    const {user_id, project_id,todo_id}=createUserTodoDto;

  const todo=await this.prisma.todo.findUnique({
    where: { todo_id},
    select: {task_id:true},
  })

  if (!todo) {
    throw new Error('Todo not found');
  }

  const member = await this.prisma.user_project.findFirst({
    where: {
      user_id: user_id,
      project_id: project_id,
    },
  });

  if (!member) {
    throw new Error('User is not assigned to this project');
  }    

  const todotask=await this.prisma.todo.findFirst({
    where: {
      todo_id:todo_id,
      task_id:todo.task_id,
    }
  })

  const todoproject=await this.prisma.task.findFirst({
    where: {
      task_id:todotask?.task_id,
      project_id:project_id,
    }
  })

  if (!todoproject) {
    throw new Error('Todo is not part of the same project');
  }

  console.log("createUserTodoDto: ", createUserTodoDto);

  return this.prisma.user_todo.create({ 
    data: createUserTodoDto
    // {
    //   user_id:user_id,
    //   project_id:project_id,
    //   todo_id:todo_id,
      
    // },
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