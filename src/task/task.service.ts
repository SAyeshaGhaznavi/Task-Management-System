import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({ 
      data: createTaskDto,
    });
  }

  findAll() {
    return this.prisma.task.findMany();
  }

  findOne(id: number) {
    return this.prisma.task.findUnique({ where: { task_id:id } });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.prisma.task.update({
      where: { task_id:id },
      data: updateTaskDto,
    });
  }

  remove(id: number) {
    return this.prisma.task.delete({ where: { task_id:id } });
  }
}

