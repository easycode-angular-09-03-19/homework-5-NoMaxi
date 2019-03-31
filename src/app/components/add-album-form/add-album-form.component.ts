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
    album = {
        id: 0,
        title: '',
        userId: 0
    };
    isBeingEdited = false;

    @ViewChild('addAlbumForm') form: NgForm;

    constructor(
        public albumService: AlbumsService,
        public albumEvents: AlbumEventsService,
        public alertMessageService: AlertMessageService
    ) {}

    ngOnInit() {
        this.albumEvents.albumEditEventObservableSubject.subscribe((data: Album) => {
            if (data.id !== 0) {
                this.isBeingEdited = true;
                this.album.id = data.id;
                this.album.title = data.title;
                this.album.userId = data.userId;
                return;
            }

            this.form.resetForm();
        });
    }

    /** The Event handler that handles the form submitting to the server */
    onFormSubmit() {
        if (this.album.id !== 0) {
            const editedAlbum = {
                id: this.album.id,
                title: this.album.title,
                userId: this.album.userId
            };

            this.albumService.editAlbum(editedAlbum).subscribe((data: Album) => {
                this.albumEvents.emitEditedAlbum(data);
                this.album.id = 0;
                this.isBeingEdited = false;
                this.form.resetForm();

                this.alertMessageService.emitRenderAlertMessage({
                    type: 'success',
                    object: data,
                    actionPerformed: 'editAlbum'
                });
            }, (err) => {
                this.isBeingEdited = false;
                this.form.resetForm();

                this.alertMessageService.emitRenderAlertMessage({
                    type: 'error',
                    object: err,
                    actionPerformed: 'editAlbum',
                    errorMessage: err.message
                });
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
            this.form.resetForm();

            this.alertMessageService.emitRenderAlertMessage({
                type: 'success',
                object: data,
                actionPerformed: 'addNewAlbum'
            });
        }, (err) => {
            this.form.resetForm();

            this.alertMessageService.emitRenderAlertMessage({
                type: 'error',
                object: err,
                actionPerformed: 'addNewAlbum',
                errorMessage: err.message
            });
        });
    }
}
