import {Injectable, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../statemanagement/state/app.state';
import {Album} from 'app/model/album.interface';
import * as selectedAlbumActions from '../statemanagement/actions/data/selected-album.actions';

@Injectable()
export class SelectedAlbumSandbox implements OnInit{
  selectedAlbum$ = this.store.select(state => state.data.selectedAlbum);

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
  }

  setSelectedAlbum(album: Album) {
    this.store.dispatch(new selectedAlbumActions.SetSelectedAlbum(album));
  }
}
