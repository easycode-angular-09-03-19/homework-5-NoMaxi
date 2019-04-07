import { Component, OnInit } from '@angular/core';

import { AlbumsService } from '../../services/albums.service';
import { Album } from '../../interfaces/album';
import { AlbumEventsService } from '../../services/album-events.service';

@Component({
    selector: 'app-albums-list',
    templateUrl: './albums-list.component.html',
    styleUrls: ['./albums-list.component.css']
})
export class AlbumsListComponent implements OnInit {
    albums: Album[];

    constructor(
        public albumService: AlbumsService,
        public albumEvents: AlbumEventsService
    ) {}

    ngOnInit() {
        this.albumService.getAlbums().subscribe((data: Album[]) => {
            this.albums = data;
        });

        this.albumEvents.albumAddEventObservableSubject.subscribe((data: Album) => {
            if (data.title) {
                this.albums.unshift(data);
            }
        });

        this.albumEvents.albumDeleteEventObservableSubject.subscribe((albumId: number) => {
            // the deletion of the album-item is not working correctly with the
            // newly added album-items because the server assigns "id: 101" to all
            // of them and the filter method deletes all of them;
            // if the server was not fake and the album id's were assigned correctly
            // the album-item deletion method would also work correctly
            if (albumId > 0) {
                this.albums = this.albums.filter((album) => album.id !== albumId);
            }
        });

        this.albumEvents.albumEditedEventObservableSubject.subscribe((data: Album) => {
            if (data.title) {
                this.albums.forEach((album) => {
                    if (album.id === data.id) {
                        album.title = data.title;
                    }
                });
            }
        });
    }
}
