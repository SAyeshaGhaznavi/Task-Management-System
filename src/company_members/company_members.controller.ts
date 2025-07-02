import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompanyMembersService } from './company_members.service';
import { CreateCompanyMemberDto } from './dto/create-company_member.dto';
import { UpdateCompanyMemberDto } from './dto/update-company_member.dto';

@Controller('company-members')
export class CompanyMembersController {
  constructor(private readonly companyMembersService: CompanyMembersService) {}

  @Post()
  create(@Body() createCompanyMemberDto: CreateCompanyMemberDto) {
    return this.companyMembersService.create(createCompanyMemberDto);
  }

  @Get()
  findAll() {
    return this.companyMembersService.findAll();
  }

 @Get(':company_id/:user_id')
findOne(
  @Param('company_id') company_id: string,
  @Param('user_id') user_id: string,
) {
  return this.companyMembersService.findOne(+company_id, +user_id);
}

@Patch(':company_id/:user_id')
update(
  @Param('company_id') company_id: string,
  @Param('user_id') user_id: string,
  @Body() updateDto: UpdateCompanyMemberDto,
) {
  return this.companyMembersService.update(+company_id, +user_id, updateDto);
}

@Delete(':company_id/:user_id')
remove(
  @Param('company_id') company_id: string,
  @Param('user_id') user_id: string,
) {
  return this.companyMembersService.remove(+company_id, +user_id);
}
}
