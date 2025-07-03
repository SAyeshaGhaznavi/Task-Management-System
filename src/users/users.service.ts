import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return this.prisma.users.create({ 
      data: createUserDto,
    });
  }

  findAll() {
    return this.prisma.users.findMany();
  }

  findOne(identifier: number | string) {
  if (typeof identifier === 'number') {
    return this.prisma.users.findUnique({ where: { user_id: identifier } });
  }
    return this.prisma.users.findUnique({ where: { email: identifier } });
}

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.users.update({
      where: { user_id:id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prisma.users.delete({ where: { user_id:id } });
  }
}
