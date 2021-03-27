import { Component } from '@angular/core';
import { NotificationsService } from '@app/core/services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private notificationsService: NotificationsService) {
    this.notificationsService.initNotifications();
  }
}
