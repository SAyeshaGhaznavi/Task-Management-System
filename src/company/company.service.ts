import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCompanyDto: CreateCompanyDto) {
    return this.prisma.company.create({ 
      data: createCompanyDto,
    });
  }

  findAll() {
    return this.prisma.company.findMany();
  }

  findOne(id: number) {
    return this.prisma.company.findUnique({ where: { company_id:id } });
  }

  update(id: number, updateUserDto: UpdateCompanyDto) {
    return this.prisma.company.update({
      where: { company_id:id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prisma.company.delete({ where: { company_id:id } });
  }
}
