import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectQueue('notification-queue') private queue: Queue
  ) {}

  async sendNotification(userId: number, message: string) {
    await this.queue.add('send-notification', {
      userId,
      message,
    });
  }
}
