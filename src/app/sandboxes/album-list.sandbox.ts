import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../statemanagement/state/app.state';
import { FirebaseService } from '../services/firebase.service';
import * as albumActions from 'app/statemanagement/actions/data/albums.actions';
import * as albumListActions from 'app/statemanagement/actions/containers/album-list.actions';
import { Album } from '../model/album.interface';
import { CloudinaryService } from '../services/cloudinary.service';
import { HttpEventType } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class AlbumListSandbox {
  albumListContainer$ = this._store.select(state => state.containers.albumList);

  albums$ = this._store.select(state => state.data.albums);
  isUploadingToFirebase$ = this._store.select(state => state.containers.albumList.isUploadingToFirebase);

  newAlbumUploadSubscription: Subscription;
  albumCardUploadSubscriptions: Map<string, Subscription> = new Map();

  constructor(private _store: Store<AppState>,
              private _firebaseService: FirebaseService,
              private _cloudinaryService: CloudinaryService) {
  }

  addAlbum(album: Album): Promise<Album> {
    this._store.dispatch(new albumActions.AddAlbum(album));
    return Promise.resolve(album);
  }

  updateAlbum(oldAlbum: Album, newAlbum: Album, file?: File) {
    const album = Object.assign({}, oldAlbum, newAlbum);
    if (!!file) {
      this.setAlbumForm(true, album);
      this.setProgressbar(true, album);
      this.albumCardUploadSubscriptions.set(album.id, this._cloudinaryService.uploadImage(file)
        .subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
              // This is an upload progress event. Compute and show the % done:
              const progress = Math.round(100 * event.loaded / event.total);
              this.updateUploadProgress(progress, album);
            } else if (event instanceof HttpResponse) {
              album.url = event.body.secure_url;
              this._firebaseService.updateAlbum(album);
              this._store.dispatch(new albumActions.UpdateAlbum(album));
              this.resetAndHideAlbumForm(album);
            }
          },
          e => console.log(e)));
    } else {
      this._firebaseService.updateAlbum(album);
      this._store.dispatch(new albumActions.UpdateAlbum(album));
      this.resetAndHideAlbumForm(album);
    }
  }

  uploadImageToAlbum(album: Album, image: File) {
    this.updateAlbum(album, album, image);
  }

  loadAlbums() {
    this._firebaseService.loadAlbums().first().subscribe(albums =>
      this._store.dispatch(new albumActions.AddAllAlbum(albums)));
  }

  setProgressbar(show: boolean, album: Album = null) {
    if (!!album) {
      this._store.dispatch(new albumListActions.SetAlbumCardProgressBar(album, show));
    } else {
      this._store.dispatch(new albumListActions.SetAlbumProgressBar(show));
    }
  }

  setAlbumForm(showForm: boolean, album: Album = null) {
    if (!!album) {
      this._store.dispatch(new albumListActions.SetAlbumCardForm(album, showForm));
    } else {
      this._store.dispatch(new albumListActions.SetAlbumForm(showForm));
    }
  }

  cancelAlbumUpload(album: Album = null) {
    if (!!album) {
      const subscription = this.albumCardUploadSubscriptions.get(album.id);
      subscription ? subscription.unsubscribe() : {};
      this.albumCardUploadSubscriptions.delete(album.id);
      this.deleteAlbum(album);
    } else {
      this.newAlbumUploadSubscription ? this.newAlbumUploadSubscription.unsubscribe() : {};
    }
  }

  deleteAlbum(album: Album) {
    this._store.dispatch(new albumActions.RemoveAlbum(album.id));
    this._firebaseService.deleteAlbum(album)
      .catch(e => console.log(e));
  }

  updateUploadProgress(progress: number, album: Album = null) {
    if (!!album) {
      this._store.dispatch(new albumListActions.SetAlbumCardUploadProgress(album, progress));
    } else {
      this._store.dispatch(new albumListActions.SetAlbumUploadProgress(progress));
    }
  }

  resetAndHideAlbumForm(album: Album = null) {
    if (!!album) {
      this.setProgressbar(false, album);
      this.setAlbumForm(false, album);
    } else {
      this.setProgressbar(false);
      this.setAlbumForm(false);
    }
  }

  uploadAlbumDataToFirebase(album: Album): Promise<Album> {
    return this._firebaseService.addAlbum(album)
      .then(response => {
          album.id = response.id;
          this._firebaseService.updateAlbum(album);
          return Promise.resolve(album);
        }
      );
  }

  setIsUploadingToFirebase(isUploading: boolean) {
    this._store.dispatch(new albumListActions.SetIsUploading(isUploading));
  }
}
