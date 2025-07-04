import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('notification-queue')
export class NotificationsProcessor {
  @Process('send-notification')
  async handleNotification(job: Job) {
    console.log('Sending notification:', job.data);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Notification sent to', job.data.userId);
  }
}
