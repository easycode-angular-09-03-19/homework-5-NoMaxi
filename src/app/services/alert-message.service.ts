import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { AlertMessage } from '../interfaces/alert-message';

@Injectable({
    providedIn: 'root'
})
export class AlertMessageService {
    private alertMessageEventSource = new BehaviorSubject({});
    public alertMessageEventObservableSubject = this.alertMessageEventSource.asObservable();

    constructor() {}

    /** Form and return the object containing information about alert message class and text */
    static getAlertMessage(msg: AlertMessage) {
        let messageClass = '';
        let messageText = '';
        
        if (msg.type === 'error') {
            messageClass = 'danger';
            messageText = msg.errorMessage;
        } else if (msg.type === 'success') {
            switch (msg.actionPerformed) {
                case 'addNewAlbum':
                    messageClass = 'success';
                    messageText =
                        `The album { id: ${ msg.object.id }, title: ${ msg.object.title } }
                        has been successfully added to the list`;
                    break;
                case 'deleteAlbum':
                    messageClass = 'warning';
                    messageText =
                        `The album { id: ${ msg.object.id }, title: ${ msg.object.title } }
                        has been successfully deleted from the list`;
                    break;
                case 'editAlbum':
                    messageClass = 'success';
                    messageText =
                        `The album with id ${ msg.object.id }
                        has been successfully edited`;
                    break;
                default:
                    messageClass = 'danger';
                    messageText = 'Unknown action has been performed';
            }
        } else {
            messageClass = 'danger';
            messageText = 'Unknown message type';
        }

        return { class: messageClass, message: messageText };
    }

    /** Emit the alert message object */
    emitRenderAlertMessage(msg: AlertMessage) {
        this.alertMessageEventSource.next(msg);
    }
}
