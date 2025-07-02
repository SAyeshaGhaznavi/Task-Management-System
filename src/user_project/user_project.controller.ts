import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserProjectService } from './user_project.service';
import { CreateUserProjectDto } from './dto/create-user_project.dto';
import { UpdateUserProjectDto } from './dto/update-user_project.dto';
import { Project } from 'src/project/entities/project.entity';

@Controller('user-project')
export class UserProjectController {
  constructor(private readonly userProjectService: UserProjectService) {}

  @Post()
  create(@Body() createUserProjectDto: CreateUserProjectDto) {
    return this.userProjectService.create(createUserProjectDto);
  }

  @Get()
  findAll() {
    return this.userProjectService.findAll();
  }

   @Get(':user_id/:project_id')
  findOne(
    @Param('project_id') project_id: string,
    @Param('user_id') user_id: string,
  ) {
    return this.userProjectService.findOne(+project_id,+user_id);
  }
  
  @Patch(':user_id/:project_id')
  update(
    @Param('project_id') project_id: string,
    @Param('user_id') user_id: string,
    @Body() updateDto: UpdateUserProjectDto,
  ) {
    return this.userProjectService.update(+project_id, +user_id, updateDto);
  }
  
  @Delete(':user_id/:project_id')
  remove(
    @Param('project_id') project_id: string,
    @Param('user_id') user_id: string,
  ) {
    return this.userProjectService.remove(+project_id, +user_id);
  }
}
