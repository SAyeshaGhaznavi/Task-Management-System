import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto) {
    return this.prisma.project.create({
      data: createProjectDto,
    });
  }

  async findAll() {
    return this.prisma.project.findMany();
  }

  async findOne(id: number) {
    return this.prisma.project.findUnique({
      where: { project_id: id },
    });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.prisma.project.update({
      where: { project_id: id },
      data: updateProjectDto,
    });
  }

  async remove(id: number) {
    return this.prisma.project.delete({
      where: { project_id: id },
    });
  }
}
