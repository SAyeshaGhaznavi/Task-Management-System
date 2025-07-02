import { Module } from '@nestjs/common';
import { InvitedMemberService } from './invited_member.service';
import { InvitedMemberController } from './invited_member.controller';

@Module({
  controllers: [InvitedMemberController],
  providers: [InvitedMemberService],
})
export class InvitedMemberModule {}
