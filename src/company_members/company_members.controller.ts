import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { CompanyMembersService } from './company_members.service';
import { CreateCompanyMemberDto } from './dto/create-company_member.dto';
import { UpdateCompanyMemberDto } from './dto/update-company_member.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { Request } from 'express';

@Controller('company-members')
export class CompanyMembersController {
  constructor(private readonly companyMembersService: CompanyMembersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @Roles(Role.ADMIN)
  async create(
    @Body() createCompanyMemberDto: CreateCompanyMemberDto,
    @Req() req: Request,
  ) {
    const user = req.user as any;
    const isAuthorized = await this.companyMembersService.isAdminOfCompany(
      user.userId,
      createCompanyMemberDto.company_id,
    );

    if (!isAuthorized) {
      throw new ForbiddenException('Only company admins can add members');
    }

    return this.companyMembersService.create(createCompanyMemberDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':company_id/:user_id')
  @Roles(Role.ADMIN)
  async remove(
    @Param('company_id') company_id: string,
    @Param('user_id') user_id: string,
    @Req() req: Request,
  ) {
    const user = req.user as any;
    const isAuthorized = await this.companyMembersService.isAdminOfCompany(
      user.userId,
      +company_id,
    );

    if (!isAuthorized) {
      throw new ForbiddenException('Only company admins can remove members');
    }

    return this.companyMembersService.remove(+company_id, +user_id);
  }

  //@UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.companyMembersService.findAll();
  }

  //@UseGuards(JwtAuthGuard)
 @Get(':company_id/:user_id')
findOne(
  @Param('company_id') company_id: string,
  @Param('user_id') user_id: string,
) {
  return this.companyMembersService.findOne(+company_id, +user_id);
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Patch(':company_id/:user_id')
@Roles(Role.ADMIN)
async update(
  @Param('company_id') company_id: string,
  @Param('user_id') user_id: string,
  @Body() updateDto: UpdateCompanyMemberDto,
  @Req() req: Request,
  )
  {
    const user = req.user as any;
    //console.log("UserId: ", user.userId);
    const isAuthorized = await this.companyMembersService.isAdminOfCompany(
      user.userId,
      +company_id,
    );

    if (!isAuthorized) {
      throw new ForbiddenException('Only company admins can update members');
    }

    return this.companyMembersService.update(+company_id, +user_id, updateDto);
  }
}
