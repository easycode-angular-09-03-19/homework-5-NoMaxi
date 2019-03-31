import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AlbumsListComponent } from './components/albums-list/albums-list.component';
import { AlbumItemComponent } from './components/album-item/album-item.component';
import { AddAlbumFormComponent } from './components/add-album-form/add-album-form.component';
import { AlertMessageComponent } from './components/alert-message/alert-message.component';

@NgModule({
    declarations: [
        AppComponent,
        AlbumsListComponent,
        AlbumItemComponent,
        AddAlbumFormComponent,
        AlertMessageComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
