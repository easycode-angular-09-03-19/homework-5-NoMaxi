import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AlbumsService } from '../../services/albums.service';
import { AlbumEventsService } from '../../services/album-events.service';
import { Album } from '../../interfaces/album';
import { AlertMessageService } from '../../services/alert-message.service';

@Component({
    selector: 'app-add-album-form',
    templateUrl: './add-album-form.component.html',
    styleUrls: ['./add-album-form.component.css']
})
export class AddAlbumFormComponent implements OnInit {
    // default album-item object
    album: Album = {
        id: 0,
        title: '',
        userId: 0
    };
    isBeingEdited: boolean;

    @ViewChild('addAlbumForm') form: NgForm;

    constructor(
        public albumService: AlbumsService,
        public albumEvents: AlbumEventsService,
        public alertMessageService: AlertMessageService
    ) {}

    ngOnInit() {
        // this.isBeingEdited = false;
        this.albumEvents.albumEditEventObservableSubject.subscribe((data: Album) => {
            this.isBeingEdited = false;
            if (data.id !== 0) {
                this.isBeingEdited = true;
                this.album = Object.assign({}, data);
                return;
            }
            this.form.resetForm();
        });
    }

    /** The Event handler that handles the form submitting to the server */
    onFormSubmit() {
        if (this.album.id !== 0) {
            this.albumService.editAlbum({ ...this.album }).subscribe((data: Album) => {
                this.albumEvents.emitEditedAlbum(data);
                this.album.id = 0;

                this.alertMessageService.emitRenderAlertMessage({
                    type: 'success',
                    object: data,
                    actionPerformed: 'editAlbum'
                });
            }, (err) => {
                this.alertMessageService.emitRenderAlertMessage({
                    type: 'error',
                    object: err,
                    actionPerformed: 'editAlbum',
                    errorMessage: err.message
                });
            }, () => {
                this.isBeingEdited = false;
                this.form.resetForm();
            });
            return;
        }

        const newAlbum = {
            id: this.album.id,
            title: this.album.title,
            userId: 1
        };

        this.albumService.addNewAlbum(newAlbum).subscribe((data: Album) => {
            this.albumEvents.emitAddNewAlbum(data);

            this.alertMessageService.emitRenderAlertMessage({
                type: 'success',
                object: data,
                actionPerformed: 'addNewAlbum'
            });
        }, (err) => {
            this.alertMessageService.emitRenderAlertMessage({
                type: 'error',
                object: err,
                actionPerformed: 'addNewAlbum',
                errorMessage: err.message
            });
        }, () => {
            this.form.resetForm();
        });
    }
}
