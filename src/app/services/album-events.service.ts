import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Album } from '../interfaces/album';

@Injectable({
    providedIn: 'root'
})
export class AlbumEventsService {
    private baseAlbumObject: Album = {
        id: 0,
        title: '',
        userId: 0
    };

    private albumAddEventSource = new BehaviorSubject({});
    public albumAddEventObservableSubject = this.albumAddEventSource.asObservable();

    private albumDeleteEventSource = new BehaviorSubject({});
    public albumDeleteEventObservableSubject = this.albumDeleteEventSource.asObservable();

    // create BehaviorSubject instance with start baseAlbumObject value for correct
    // work of ngOnInit() of <add-album-form> component
    private albumEditEventSource = new BehaviorSubject<Album>(this.baseAlbumObject);
    public  albumEditEventObservableSubject = this.albumEditEventSource.asObservable();

    private albumEditedEventSource = new BehaviorSubject({});
    public  albumEditedEventObservableSubject = this.albumEditedEventSource.asObservable();

    constructor() {}

    emitAddNewAlbum(album: Album) {
        this.albumAddEventSource.next(album);
    }

    emitDeleteAlbum(albumId: number) {
        this.albumDeleteEventSource.next(albumId);
    }

    emitEditAlbum(album: Album) {
        this.albumEditEventSource.next(album);
    }

    emitEditedAlbum(album: Album) {
        this.albumEditedEventSource.next(album);
    }
}
