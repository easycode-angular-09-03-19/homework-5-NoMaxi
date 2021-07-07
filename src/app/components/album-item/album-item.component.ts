import { Component, Input, OnInit } from '@angular/core';

import { Album } from '../../interfaces/album';
import { AlbumsService } from '../../services/albums.service';
import { AlbumEventsService } from '../../services/album-events.service';
import { AlertMessageService } from '../../services/alert-message.service';

@Component({
    selector: 'app-album-item',
    templateUrl: './album-item.component.html',
    styleUrls: ['./album-item.component.css']
})
export class AlbumItemComponent implements OnInit {
    isBeingEdited = false;

    @Input() item: Album;

    constructor(
        public albumService: AlbumsService,
        public albumEvents: AlbumEventsService,
        public alertMessageService: AlertMessageService
    ) {}

    ngOnInit() {
        this.albumEvents.albumEditEventObservableSubject.subscribe((data: Album) => {
            if (this.item.id !== data.id) {
                this.isBeingEdited = false;
            }
        });

        this.albumEvents.albumEditedEventObservableSubject.subscribe((data: Album) => {
            if (this.item.id === data.id) {
                this.isBeingEdited = false;
            }
        });
    }

    /** The Event handler that deletes current album-item from albums-list */
    onDeleteItemClick() {
        const isDeletionConfirmed = confirm(`Are you sure you want to delete the album:
            id - ${this.item.id}, title - ${this.item.title}?`);
        if (isDeletionConfirmed) {
            this.albumService.deleteAlbum(this.item.id).subscribe((data: Album) => {
                this.albumEvents.emitDeleteAlbum(this.item.id);

                this.alertMessageService.emitRenderAlertMessage({
                    type: 'success',
                    object: this.item,
                    actionPerformed: 'deleteAlbum'
                });
            }, (err) => {
                this.alertMessageService.emitRenderAlertMessage({
                    type: 'error',
                    object: err,
                    actionPerformed: 'deleteAlbum',
                    errorMessage: err.message
                });
            });
        }
    }

    /** The Event handler that handles current album-item editing */
    onEditItemToggleClick() {
        this.isBeingEdited = !this.isBeingEdited;
        if (this.isBeingEdited) {
            this.albumEvents.emitEditAlbum(this.item);
            return;
        }

        // emit the default album-object on 'Cancel'-button click for the <add-album-form> component to reset the form
        this.albumEvents.emitEditAlbum({
            id: 0,
            title: '',
            userId: 0
        });
    }
}
