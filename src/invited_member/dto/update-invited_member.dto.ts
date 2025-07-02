import { PartialType } from '@nestjs/mapped-types';
import { CreateInvitedMemberDto } from './create-invited_member.dto';

export class UpdateInvitedMemberDto extends PartialType(CreateInvitedMemberDto) {}
