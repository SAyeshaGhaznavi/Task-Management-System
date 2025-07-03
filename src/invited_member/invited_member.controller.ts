import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { InvitedMemberService } from './invited_member.service';
import { CreateInvitedMemberDto } from './dto/create-invited_member.dto';
import { UpdateInvitedMemberDto } from './dto/update-invited_member.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('invited-member')
export class InvitedMemberController {
  constructor(private readonly invitedMemberService: InvitedMemberService) {}

  @Post()
  create(@Body() createInvitedMemberDto: CreateInvitedMemberDto) {
    return this.invitedMemberService.create(createInvitedMemberDto);
  }

  @Get()
  findAll() {
    return this.invitedMemberService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invitedMemberService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInvitedMemberDto: UpdateInvitedMemberDto,
    @Req() req: Request,
  ) {
    const user = req.user as any;
    return this.invitedMemberService.update(+id, updateInvitedMemberDto, user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invitedMemberService.remove(+id);
  }
}
