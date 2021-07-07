import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Album } from '../interfaces/album';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AlbumsService {
    private apiUrl: string = environment.apiUrl;

    constructor(
        private http: HttpClient
    ) {}

    getAlbums(): Observable<Album[]> {
        return this.http.get<Album[]>(`${this.apiUrl}/albums`);
    }

    addNewAlbum(album: Album): Observable<object> {
        return this.http.post(`${this.apiUrl}/albums`, album);
    }

    deleteAlbum(albumId: number): Observable<object> {
        return this.http.delete(`${this.apiUrl}/albums/${albumId}`);
    }

    editAlbum(album: Album): Observable<object> {
        return this.http.put(`${this.apiUrl}/albums/${album.id}`, album);
    }
}


/* Логика и последовательность действий приложения:

1. Удаление и добавление альбомов:
    1) При нажатии на кнопки 'Delete' (событие (click)="onDeleteItemClick()") компоненты
    <album-item> и 'Submit' (событие (ngSubmit)=""onFormSubmit()") компоненты
    <add-album-form>, вызываются методы deleteAlbum() и addNewAlbum() сервиса albums
    соотвественно.
    2) Методы deleteAlbum() и addNewAlbum() выполняют http-запросы, отправляя на сервер
    данные формы методами DELETE и POST соотвественно.
    3) Возвращенные от сервера данные передаются в качестве параметров в методы
    emitAddNewAlbum() и emitDeleteAlbum() сервиса album-events
    4) Компонента <albums-list> подписывается на обе Observables из п.3.
    Методы emitAddNewAlbum() и emitDeleteAlbum() при помощи экземпляров
    BehaviorSubject передают компоненте <albums-list> информацию о том, что
    произошли изменения (события удаления и добавления album-item) в компонентах
    <album-item> и <add-album-form>.
    5) На основании полученных данных в компоненте <albums-list> выполняется добавление
    в массив albums[] новой album-item или удаление из массива albums[] существующей
    album-item.

2. Редактирование альбомов:
    1) При нажатии на кнопку 'Edit' (событие (click)="onEditItemToggleClick()")
    компоненты <album-item> вызывается метод editAlbum() сервиса albums, а также
    меняется состояние компоненты <album-item> (isBeingEdited = true) - кнопка 'Edit'
    становится 'Cancel'.
    2) Компонента <add-album-form> подписывается на события в компоненте <album-item>
    через BehaviorSubject. Метод editAlbum() вызывает emitEditAlbum() сервиса album-events,
    который оповещает компоненту <add-album-form> об изменении состояния данной компоненты
    <album-item>.
    3) Данные из возвращенной Observable, используются для изменения состояния
    компоненты <add-album-form> - поле формы input заполняется title, полученным
    из компоненты <album-item>, а кнопка 'Submit' меняется на 'Save'.
    4) При нажатии на кнопку 'Save' формы (событие (ngSubmit)=""onFormSubmit()") данные
    формы отправляются на сервер методом PUT.
    5) Возвращенные данные от сервера передают в качестве пераметра в метод emitEditedAlbum(),
    на который подписана компонента <albums-list>
    6) На основании полученных данных в компоненте <albums-list> выполняется изменение
    в массиве albums[] конкретной album-item.

3. Вывод alert-сообщений:
    1) Компонента <alert-message> подписывается на события в компонентах <album-item> и
    <add-album-form> через BehaviorSubject.
    2) При удалении/добавлении и редактировании album-item данные Observable передаются
    в метод emitRenderAlertMessage() сервиса alert-message, который отвечает за
    формирование объекта alert-сообщения (метод getAlertMessage()) и его передачу
    (эмит) (метод emitRenderAlertMessage()).
    3) Сформированный на основании полученных данных в сервисе alert-message
    объект сообщения (содержит класс для отображения в разметке и текст сообщения)
    передается в соответствущую компоненту.
    4) В результате вызова метода renderAlertMessage() компоненты <alert-message>
    выполняется отображение alert-сообщения в разметке.
*/
