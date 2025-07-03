import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInvitedMemberDto } from './dto/create-invited_member.dto';
import { UpdateInvitedMemberDto } from './dto/update-invited_member.dto';

@Injectable()
export class InvitedMemberService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createInvitedMemberDto: CreateInvitedMemberDto) {
    const {invited_id, invited_by_id}=createInvitedMemberDto;

    const invited=await this.prisma.users.findFirst({
      where: {
        user_id:invited_id,
      },
    });

  if (!invited) {
    throw new Error('Invited member does not exist');
  }

    return this.prisma.invited_member.create({
      data: createInvitedMemberDto,
    });
  }

  findAll() {
    return this.prisma.invited_member.findMany();
  }

  findOne(id: number) {
    return this.prisma.invited_member.findUnique({ where: { invited_id:id } });
  }

  update(id: number, updateInvitedMemberDto: UpdateInvitedMemberDto, user_id:number) {
    if(id!==user_id)
    {
      throw new ForbiddenException("You are not authorized to update invite");
    }
    return this.prisma.invited_member.update({
      where: { invited_id:id },
      data: updateInvitedMemberDto,
    });
  }

  remove(id: number) {
    return this.prisma.invited_member.delete({ where: { invited_id:id } });
  }
}

