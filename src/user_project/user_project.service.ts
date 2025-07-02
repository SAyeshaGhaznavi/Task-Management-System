import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserProjectDto } from './dto/create-user_project.dto';
import { UpdateUserProjectDto } from './dto/update-user_project.dto';

@Injectable()
export class UserProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserProjectDto: CreateUserProjectDto) {
    return this.prisma.user_project.create({ 
      data: createUserProjectDto,
    });
  }

  findAll() {
    return this.prisma.user_project.findMany();
  }

  findOne(project_id: number, user_id: number) {
  return this.prisma.user_project.findUnique({
    where: {
      user_id_project_id: {
        project_id,
        user_id,
      },
    },
  });
}

  update(project_id: number, user_id: number, updateUserProjectDto: UpdateUserProjectDto) {
  return this.prisma.user_project.update({
    where: {
      user_id_project_id: {
        project_id,
        user_id,
      },
    },
    data: updateUserProjectDto,
  });
}

  remove(project_id: number, user_id: number) {
    return this.prisma.user_project.delete({
    where: {
      user_id_project_id: {
        project_id,
        user_id,
      },
    },
  });
  }
}

