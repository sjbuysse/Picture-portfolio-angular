import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../statemanagement/state/app.state';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from 'rxjs/Observable';
import { Album } from 'app/model/album.interface';
import * as albumActions from 'app/statemanagement/actions/data/albums.actions';

@Injectable()
export class AlbumSandbox {

  albums$ = this._store.select(state => state.data.albums);

  constructor(
    private _store: Store<AppState>,
    private _firebaseService: FirebaseService
  ) { }

  loadAlbums() {
    this._firebaseService.loadAlbums().subscribe(albums =>
      this._store.dispatch(new albumActions.AddAllAlbum(albums)));
  }
}
