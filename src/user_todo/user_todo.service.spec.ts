import { Test, TestingModule } from '@nestjs/testing';
import { UserTodoService } from './user_todo.service';

describe('UserTodoService', () => {
  let service: UserTodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTodoService],
    }).compile();

    service = module.get<UserTodoService>(UserTodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
