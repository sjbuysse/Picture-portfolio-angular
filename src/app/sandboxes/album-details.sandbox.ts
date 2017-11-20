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
import { AlbumDetailsState } from '../statemanagement/state/containers/album-details.state';
import 'rxjs/add/operator/combineLatest';


@Injectable()
export class SelectedAlbumSandbox implements OnInit {
  selectedAlbum$: Observable<Album> = this._store.select(state => state.data.selectedAlbum);
  // container state
  albumDetails$: Observable<AlbumDetailsState> = this._store.select(state => state.containers.albumDetails);

  constructor(private _store: Store<AppState>,
              private _firebaseService: FirebaseService,
              private _cloudinaryService: CloudinaryService) {
  }

  ngOnInit(): void {
  }

  setImageForm(showImageForm: boolean) {
    this._store.dispatch(new albumDetailsActions.SetImageForm(showImageForm));
  }

  uploadImage(file: File, image: Image) {
    // TODO: should I unsubscribe here?
    this.selectedAlbum$.first().combineLatest(this._cloudinaryService.uploadImage(file))
      .subscribe(values => {
          const [selectedAlbum, event] = values;
          if (event.type === HttpEventType.UploadProgress) {
            // This is an upload progress event. Compute and show the % done:
            const progress = Math.round(100 * event.loaded / event.total);
            this.updateUploadProgress(progress);
          } else if (event instanceof HttpResponse) {
            image.url = event.body.secure_url;
            this.uploadImageDataToFirebase(image, selectedAlbum);
            this.resetAndHideProgressbar();
          }
        },
        e => console.log(e));
  }


  addImage(image: Image) {
    this._store.dispatch(new selectedAlbumActions.AddImage(image));
  }

  setProgressbar(show: boolean) {
    this._store.dispatch(new albumDetailsActions.SetProgressBar(show));
  }

  loadAlbumDetails(albumId: string) {
    this._firebaseService.loadAlbumDetails(albumId).combineLatest(this._firebaseService.loadAlbumImages(albumId)).first()
      .subscribe(values => {
        const [albumDetails, images] = values;
        albumDetails.images = images;
        this._store.dispatch(new selectedAlbumActions.SetSelectedAlbum(albumDetails));
      });
  }

  private uploadImageDataToFirebase(image: Image, selectedAlbum: Album): Promise<void> {
    return this._firebaseService.addImage(image, selectedAlbum)
      .then(response => {
          image.id = response.id;
          return this._firebaseService.updateImage(image, selectedAlbum);
        }
      ).then(() => this.addImage(image));
  }

  private resetAndHideProgressbar() {
    this.setProgressbar(false);
    this.setImageForm(false);
  }

  private updateUploadProgress(progress: number) {
    this._store.dispatch(new albumDetailsActions.SetUploadProgress(progress));
  }
}
