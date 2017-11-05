import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../statemanagement/state/app.state';
import {Album} from 'app/model/album.interface';
import * as AlbumActions from 'app/statemanagement/actions/data/albums.actions';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AlbumSandbox {

  albums$ = this._store.select(state => state.data.albums);

  constructor(
    private _store: Store<AppState>,
  ) { }

  getAlbum(id: string): Observable<Album> {
    return this._store.select(state => state.data.albums.find(album => album.id === id));
  }
}
