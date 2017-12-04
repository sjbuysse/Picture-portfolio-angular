import { Component, OnInit } from '@angular/core';
import { Album, createAlbum } from 'app/model/album.interface';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AlbumListSandbox } from '../../sandboxes/album-list.sandbox';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadButtons, UploadLabels } from '../../upload/upload.model';
import { CardActions, Card } from '../../components/card/card.model';
import 'rxjs/add/operator/do';
import { CardState, createCardSate } from '../../statemanagement/state/containers/album-list.state';

@Component({
  selector: 'app-albums',
  templateUrl: './albumlist.component.html',
  styleUrls: ['./albumlist.component.css']
})
export class AlbumsComponent implements OnInit {
  // TODO: make containerstate voor isuploadingtofirebase$
  albumListContainer$ = this._albumListSandbox.albumListContainer$;
  albums$: Observable<Album[]> = this._albumListSandbox.albums$;
  uploadForm: FormGroup;
  actions: CardActions = {
    handleClickCard: (album: Album) => this._router.navigate([`/albums/${album.id}`]),
    delete: (album: Album) => {},
    setEdit: (album: Album) => {}
  };
  uploadButtons: UploadButtons = {
    cancel: () => this.cancelCreationAlbum(),
    submit: (formGroup: FormGroup, file: File) => this.onCreateAlbum(formGroup, file)
  };
  uploadLabels: UploadLabels = {
    imageBtnLabel: 'Select a cover image',
    nameLabel: 'Name album',
    captionLabel: 'Caption'
  };

  // create the cardObjects
  cardStates$: Observable<Map<string, CardState>> = this.albumListContainer$.map(albumListState => albumListState.cardStates);
  albumCards$: Observable<Card[]> = this.albums$.map((albums) =>
  albums.map(album => this.createAlbumSummary(album)));

  constructor(private _router: Router,
              private _fb: FormBuilder,
              private _albumListSandbox: AlbumListSandbox,
              public  afAuth: AngularFireAuth) {
  }

  ngOnInit() {
    this._albumListSandbox.loadAlbums();
    this.uploadForm = this.buildUploadForm();
  }

  showCreateAlbumForm() {
    this._albumListSandbox.setAlbumForm(true);
  }

  updateAlbum(oldAlbum: Album, formGroup: FormGroup, file: File) {
    const newAlbum: Album = this.parseFormValue(formGroup.value);
    this._albumListSandbox.updateAlbum(oldAlbum, newAlbum, file);
  }

  cancelUpdateAlbum(album: Album) {
    this._albumListSandbox.setAlbumForm(false, album);
    this._albumListSandbox.setProgressbar(false, album);
    this._albumListSandbox.updateUploadProgress(0, album);
    this._albumListSandbox.cancelAlbumUpload(album);
  }

  cancelCreationAlbum() {
    this._albumListSandbox.setAlbumForm(false);
    this._albumListSandbox.setProgressbar(false);
    this._albumListSandbox.updateUploadProgress(0);
    this._albumListSandbox.cancelAlbumUpload();
    this.uploadForm = this.buildUploadForm();
  }

  onCreateAlbum(formGroup: FormGroup, file: File) {
    const album = this.parseFormValue(this.uploadForm.value);
    // TODO: set temp image to the one you read in...
    album.url = 'http://via.placeholder.com/350x150';

    this._albumListSandbox.uploadAlbumDataToFirebase(album)
      .then((albumWithId) => {
      this.resetAndHideNewAlbumForm();
      this._albumListSandbox.addAlbum(albumWithId);
      this._albumListSandbox.uploadImageToAlbum(albumWithId,  file);
      });
  }

  private resetAndHideNewAlbumForm() {
    this.uploadForm = this.buildUploadForm();
    this._albumListSandbox.resetAndHideAlbumForm();
  }

  private createAlbumSummary(album: Album): Card {
    return Object.assign({}, {
      cardObject: album,
      uploadButtons: this.createSummaryUploadButtons(album),
      uploadLabels: this.createSummaryUploadLabels(),
      actions: this.createSummaryActions()
    });
  }

  private createSummaryUploadButtons(album: Album): UploadButtons {
    return {
      cancel: () => this.cancelUpdateAlbum(album),
      submit: (formGroup: FormGroup, file: File) => this.updateAlbum(album, formGroup, file)
    };
  }

  private createSummaryActions(): CardActions {
    return {
      handleClickCard: (album: Album) => this._router.navigate([`/albums/${album.id}`]),
      delete: (album: Album) => this._albumListSandbox.deleteAlbum(album),
      setEdit: (album: Album) => this._albumListSandbox.setAlbumForm(true, album)
    };
  }

  private createSummaryUploadLabels(): UploadLabels {
    return this.uploadLabels;
  }

  private buildUploadForm() {
    return this._fb.group({
      name: ['', Validators.required],
      caption: ['', Validators.required],
      file: ['', Validators.required]
    });
  }

  private parseFormValue(formValue: any): Album {
    delete formValue.file;
    return Object.assign({}, formValue);
  }
}
