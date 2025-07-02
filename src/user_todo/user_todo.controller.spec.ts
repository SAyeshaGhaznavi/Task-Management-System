import { Test, TestingModule } from '@nestjs/testing';
import { UserTodoController } from './user_todo.controller';
import { UserTodoService } from './user_todo.service';

describe('UserTodoController', () => {
  let controller: UserTodoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTodoController],
      providers: [UserTodoService],
    }).compile();

    controller = module.get<UserTodoController>(UserTodoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
