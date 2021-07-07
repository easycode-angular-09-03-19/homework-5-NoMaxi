import { Component, OnInit } from '@angular/core';

import { AlertMessageService } from '../../services/alert-message.service';
import { AlertMessage } from '../../interfaces/alert-message';


@Component({
    selector: 'app-alert-message',
    templateUrl: './alert-message.component.html',
    styleUrls: ['./alert-message.component.css']
})
export class AlertMessageComponent implements OnInit {
    isVisible: boolean;
    alertClass: string;
    alertMessageText: string;

    constructor(
        public alertMessageService: AlertMessageService,
    ) {}

    ngOnInit() {
        this.alertMessageService.alertMessageEventObservableSubject.subscribe((msg: AlertMessage) => {
            if (msg.object) {
                this.renderAlertMessage(msg);
                setTimeout(() => {
                    this.isVisible = false;
                }, 6000);
            }
        });
    }

    /** Render the alert message according to the action performed */
    renderAlertMessage(msg: AlertMessage) {
        this.isVisible = true;
        this.alertClass = AlertMessageService.getAlertMessage(msg).class;
        this.alertMessageText = AlertMessageService.getAlertMessage(msg).message;
    }
}
