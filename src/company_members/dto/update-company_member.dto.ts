import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyMemberDto } from './create-company_member.dto';

export class UpdateCompanyMemberDto extends PartialType(CreateCompanyMemberDto) {}
