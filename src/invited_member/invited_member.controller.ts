import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InvitedMemberService } from './invited_member.service';
import { CreateInvitedMemberDto } from './dto/create-invited_member.dto';
import { UpdateInvitedMemberDto } from './dto/update-invited_member.dto';

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvitedMemberDto: UpdateInvitedMemberDto) {
    return this.invitedMemberService.update(+id, updateInvitedMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invitedMemberService.remove(+id);
  }
}
