import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../statemanagement/state/app.state';
import { FirebaseService } from '../services/firebase.service';
import * as albumActions from 'app/statemanagement/actions/data/albums.actions';
import * as albumListActions from 'app/statemanagement/actions/containers/album-list.actions';
import { Album } from '../model/album.interface';
import { CloudinaryService } from '../services/cloudinary.service';
import { HttpEventType } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class AlbumListSandbox {
  albumListContainer$ = this._store.select(state => state.containers.albumList);

  albums$ = this._store.select(state => state.data.albums);

  constructor(
    private _store: Store<AppState>,
    private _firebaseService: FirebaseService,
    private _cloudinaryService: CloudinaryService
  ) { }

  addAlbum(album: Album) {
    this._store.dispatch(new albumActions.AddAlbum(album));
  }

  loadAlbums() {
    this._firebaseService.loadAlbums().first().subscribe(albums =>
      this._store.dispatch(new albumActions.AddAllAlbum(albums)));
  }

  setProgressbar(show: boolean) {
    this._store.dispatch(new albumListActions.SetProgressBar(show));
  }

  setAlbumForm(showForm: boolean) {
    this._store.dispatch(new albumListActions.SetAlbumForm(showForm));
  }

  uploadAlbum(album: Album, file: File) {
    // TODO: should I unsubscribe here?
   this._cloudinaryService.uploadImage(file)
      .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            // This is an upload progress event. Compute and show the % done:
            const progress = Math.round(100 * event.loaded / event.total);
            this.updateUploadProgress(progress);
          } else if (event instanceof HttpResponse) {
            album.url = event.body.secure_url;
            this.uploadAlbumDataToFirebase(album);
            this.resetAndHideProgressbar();
          }
        },
        e => console.log(e));
  }

  private uploadAlbumDataToFirebase(album: Album): Promise<void> {
    return this._firebaseService.addAlbum(album)
      .then(response => {
          album.id = response.id;
          return this._firebaseService.updateAlbum(album);
        }
      ).then(() => this.addAlbum(album));
  }

  private updateUploadProgress(progress: number) {
    this._store.dispatch(new albumListActions.SetUploadProgress(progress));
  }

  private resetAndHideProgressbar() {
    this.setProgressbar(false);
    this.setAlbumForm(false);
  }
}