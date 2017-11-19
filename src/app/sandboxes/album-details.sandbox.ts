import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../statemanagement/state/app.state';
import { Album } from 'app/model/album.interface';
import * as selectedAlbumActions from 'app/statemanagement/actions/data/selected-album.actions';
import * as albumDetailsActions from 'app/statemanagement/actions/containers/album-details.actions';
import { Observable } from 'rxjs/Observable';
import { createImage, Image } from '../model/image.interface';
import { CloudinaryService } from '../services/cloudinary.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FirebaseService } from '../services/firebase.service';

@Injectable()
export class SelectedAlbumSandbox implements OnInit {
  selectedAlbum$: Observable<Album> = this._store.select(state => state.data.selectedAlbum);
  albumDetails$ = this._store.select(state => state.containers.albumDetails);

  constructor(private _store: Store<AppState>,
              private _firebaseService: FirebaseService,
              private _cloudinaryService: CloudinaryService) {
  }

  ngOnInit(): void {
  }

  setSelectedAlbum(album: Album) {
    this._store.dispatch(new selectedAlbumActions.SetSelectedAlbum(album));
  }

  setImageForm(showImageForm: boolean) {
    this._store.dispatch(new albumDetailsActions.SetImageForm(showImageForm));
  }

  uploadImage(file: File, image: Image) {
    this._cloudinaryService.uploadImage(file).subscribe(event => {
      // Via this API, you get access to the raw event stream.
      // Look for upload progress events.
      if (event.type === HttpEventType.UploadProgress) {
        // This is an upload progress event. Compute and show the % done:
        const progress = Math.round(100 * event.loaded / event.total);
        this.updateUploadProgress(progress);
      } else if (event instanceof HttpResponse) {
        this.setProgressbar(false);
        this.setImageForm(false);
        // set url on image object
        image.url = event.body.secure_url;
        // upload to firebase
        this._firebaseService.addImage(image)
          .then(response => {
            image.id = response.id;
            return this._firebaseService.updateImage(image);
            }
          ).then(() => this.addImage(image));
      }
    });
  }


  addImage(image: Image) {
    this._store.dispatch(new selectedAlbumActions.AddImage(image));
  }

  setProgressbar(show: boolean) {
    this._store.dispatch(new albumDetailsActions.SetProgressBar(show));
  }

  private updateUploadProgress(progress: number) {
    this._store.dispatch(new albumDetailsActions.SetUploadProgress(progress));
  }
}
