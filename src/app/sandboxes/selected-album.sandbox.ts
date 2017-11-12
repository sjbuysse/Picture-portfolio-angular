import {Injectable, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../statemanagement/state/app.state';
import {Album} from 'app/model/album.interface';
import * as selectedAlbumActions from 'app/statemanagement/actions/data/selected-album.actions';
import * as albumDetailsActions from 'app/statemanagement/actions/containers/album-details.actions';
import {Observable} from 'rxjs/Observable';
import {createImage} from '../model/image.interface';

@Injectable()
export class SelectedAlbumSandbox implements OnInit {
  selectedAlbum$: Observable<Album> = this._store.select(state => state.data.selectedAlbum);
  albumDetails$ = this._store.select(state => state.containers.albumDetails);

  constructor(
    private _store: Store<AppState>,
  ) { }

  ngOnInit(): void {
  }

  setSelectedAlbum(album: Album) {
    this._store.dispatch(new selectedAlbumActions.SetSelectedAlbum(album));
  }

  setImageForm(showImageForm: boolean) {
    this._store.dispatch(new albumDetailsActions.SetImageForm(showImageForm));
  }

  addNewImage() {
    this._store.dispatch(new selectedAlbumActions.AddImage(createImage()));
  }
}
