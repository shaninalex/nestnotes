import { Component } from '@angular/core';
import { NotificationsService, Notification } from '../../services/notification.service';


@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html'
})
export class NotificationsComponent {
    notifications: Notification[];

    constructor(private notificationsService: NotificationsService) {
        this.notificationsService.notifications.subscribe({
            next: data => {
                this.notifications = data
            }
        });  
    }

    delete(i: number) { this.notificationsService.remove(i) }

}
