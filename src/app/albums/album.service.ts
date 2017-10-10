import {Injectable, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Album} from '../statemanagement/state/data/data.state';
import {Observable} from 'rxjs/Observable';
import {AppState} from '../statemanagement/state/app.state';

@Injectable()
export class AlbumService implements OnInit{
  constructor(private _store: Store<AppState>){}

  getAlbums(): Observable<Album[]> {
    return this._store.select(state => state.data.albums);
  }

  getSingleAlbum(id: string): Observable<Album> {
    return this._store.select(state => state.data.albums.find(album => album.id === id));
  }

  ngOnInit() {
  }
}
