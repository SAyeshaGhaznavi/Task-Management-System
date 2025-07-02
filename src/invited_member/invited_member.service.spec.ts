import { Test, TestingModule } from '@nestjs/testing';
import { InvitedMemberService } from './invited_member.service';

describe('InvitedMemberService', () => {
  let service: InvitedMemberService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvitedMemberService],
    }).compile();

    service = module.get<InvitedMemberService>(InvitedMemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
