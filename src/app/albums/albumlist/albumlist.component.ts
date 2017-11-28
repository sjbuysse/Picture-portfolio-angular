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
import { CardState } from '../../statemanagement/state/containers/album-list.state';

@Component({
  selector: 'app-albums',
  templateUrl: './albumlist.component.html',
  styleUrls: ['./albumlist.component.css']
})
export class AlbumsComponent implements OnInit {
  albumListContainer$ = this._albumListSandbox.albumListContainer$;
  albums: Observable<Album[]> = this._albumListSandbox.albums$;
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
  albumCards$: Observable<Card[]> = this.albums.map(albums =>
    albums.map(album => this.createAlbumSummary(album)));
  cardStates$: Observable<WeakMap<Album, CardState>> = this.albumListContainer$.select(state => state.cardStates);

  constructor(private _router: Router,
              private _fb: FormBuilder,
              private _albumListSandbox: AlbumListSandbox,
              public  afAuth: AngularFireAuth) {
  }

  ngOnInit() {
    this._albumListSandbox.loadAlbums();
    this.uploadForm = this.buildUploadForm();
  }

  showAlbumForm() {
    // this._albumListSandbox.setAlbumForm(true);
  }

  updateAlbum(oldAlbum: Album, formGroup: FormGroup, file: File) {
    const newAlbum: Album = this.parseFormValue(formGroup.value);
    this._albumListSandbox.updateAlbum(oldAlbum, newAlbum, file);
  }

  cancelCreationAlbum() {
    // this._albumListSandbox.setAlbumForm(false);
    this.uploadForm = this.buildUploadForm();
  }

  onCreateAlbum(formGroup: FormGroup, file: File) {
    // this._albumListSandbox.setProgressbar(album,true);
    const album = this.parseFormValue(this.uploadForm.value);
    this._albumListSandbox.uploadAlbum(album, file);
  }

  private createAlbumSummary(album: Album): Card {
    console.log(album);
    return Object.assign({}, {
      cardObject: album,
      uploadButtons: this.createSummaryUploadButtons(album),
      uploadLabels: this.createSummaryUploadLabels(),
      actions: this.createSummaryActions()
    });
  }

  private createSummaryUploadButtons(album: Album): UploadButtons {
    return {
      cancel: () => {},
      submit: (formGroup: FormGroup, file: File = null) => this.updateAlbum(album, formGroup, file)
    };
  }

  private createSummaryActions(): CardActions {
    return {
      handleClickCard: (album: Album) => this._router.navigate([`/albums/${album.id}`]),
      delete: (deletedAlbum: Album) => {},
      setEdit: (album: Album) => this._albumListSandbox.setAlbumForm(album, true)
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
