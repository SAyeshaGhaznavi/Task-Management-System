import { Test, TestingModule } from '@nestjs/testing';
import { InvitedMemberController } from './invited_member.controller';
import { InvitedMemberService } from './invited_member.service';

describe('InvitedMemberController', () => {
  let controller: InvitedMemberController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvitedMemberController],
      providers: [InvitedMemberService],
    }).compile();

    controller = module.get<InvitedMemberController>(InvitedMemberController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
