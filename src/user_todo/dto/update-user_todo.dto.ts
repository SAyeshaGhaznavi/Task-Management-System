import { PartialType } from '@nestjs/mapped-types';
import { CreateUserTodoDto } from './create-user_todo.dto';

export class UpdateUserTodoDto extends PartialType(CreateUserTodoDto) {}
