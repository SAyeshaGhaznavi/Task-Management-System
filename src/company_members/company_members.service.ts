import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyMemberDto } from './dto/create-company_member.dto';
import { UpdateCompanyMemberDto } from './dto/update-company_member.dto';

@Injectable()
export class CompanyMembersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCompanyDto: CreateCompanyMemberDto) {
    return this.prisma.company_members.create({ 
      data: createCompanyDto,
    });
  }

  findAll() {
    return this.prisma.company_members.findMany();
  }

  findOne(company_id: number, user_id: number) {
  return this.prisma.company_members.findUnique({
    where: {
        company_id_user_id: {
        company_id,
        user_id,
      },
    },
  });
  
}

  update(company_id: number, user_id: number, updateDto: UpdateCompanyMemberDto) {
  return this.prisma.company_members.update({
    where: {
      company_id_user_id: {
        company_id,
        user_id,
      },
    },
    data: updateDto,
  });
}

  remove(company_id: number, user_id: number) {
    return this.prisma.company_members.delete({
    where: {
      company_id_user_id: {
        company_id,
        user_id,
      },
    },
  });
  }
}
