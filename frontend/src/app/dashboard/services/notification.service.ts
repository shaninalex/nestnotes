import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export type NType = "success" | "error" | "warning";

export interface Notification {
    content: string
    type: NType
}

@Injectable()
export class NotificationsService {
    public notifications: BehaviorSubject<Notification[]> = new BehaviorSubject<Notification[]>([]);

    add(content: string, type: NType): void {
        const message: Notification = {
            content: content,
            type: type,
        };
        this.notifications.next([...this.notifications.value, message]);
    }

    remove(index: number): void {
        const messages = this.notifications.value;
        messages.splice(index, 1);
        this.notifications.next(messages);
    }

}