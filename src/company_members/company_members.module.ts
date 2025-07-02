import { Module } from '@nestjs/common';
import { CompanyMembersService } from './company_members.service';
import { CompanyMembersController } from './company_members.controller';

@Module({
  controllers: [CompanyMembersController],
  providers: [CompanyMembersService],
})
export class CompanyMembersModule {}
