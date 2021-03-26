import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { INotificationModel } from '@app/core/models/notification.model';
import { NotificationEnum } from '@app/core/enums/notification.enum';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  readonly _notification: Subject<INotificationModel> = new Subject();
  notification$: Observable<INotificationModel> = this._notification.asObservable();

  constructor(private nzNotification: NzNotificationService) {}

  public initNotifications(): void {
    this.notification$.subscribe((n: INotificationModel) => {
      const params = { nzDuration: n.duration, nzAnimate: true };
      switch (n.type) {
        case NotificationEnum.Success:
          this.nzNotification.success(n.title, n.message, params);
          break;
        case NotificationEnum.Error:
          this.nzNotification.error(n.title, n.message, params);
          break;
        case NotificationEnum.Warning:
          this.nzNotification.warning(n.title, n.message, params);
          break;
        default:
          this.nzNotification.warning(n.title, n.message, params);
      }
    });
  }

  public notify(type: NotificationEnum, title: string, message: string, duration: number = 3000): void {
    this._notification.next({ type, title, message, duration });
  }

  public clearNotifications() {
    this.nzNotification.remove();
  }
}
