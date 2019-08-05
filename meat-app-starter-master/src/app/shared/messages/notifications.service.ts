import { EventEmitter } from "@angular/core";

export class NotificationsService {

    notifier = new EventEmitter<any>();

    notify(message: string) {
        this.notifier.emit(message);
    }

    
}