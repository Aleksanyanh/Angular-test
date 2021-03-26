import { NotificationEnum } from '@app/core/enums/notification.enum';

export interface INotificationModel {
  type: NotificationEnum;
  title: string;
  message: string;
  duration: number;
}
