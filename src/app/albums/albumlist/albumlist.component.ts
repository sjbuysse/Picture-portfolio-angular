import { Component, OnInit } from '@angular/core';
import {Album, createAlbum} from 'app/model/album.interface';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import {AlbumListSandbox} from '../../sandboxes/album-list.sandbox';
import {AngularFireAuth} from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadButtons, UploadLabels } from '../../upload/upload.model';

@Component({
  selector: 'app-albums',
  templateUrl: './albumlist.component.html',
  styleUrls: ['./albumlist.component.css']
})
export class AlbumsComponent implements OnInit {
  albumListContainer$ = this._albumListSandbox.albumListContainer$;
  albums: Observable<Album[]>;
  uploadForm: FormGroup;
  actions = {
    handleClickCard: (album: Album) => this._router.navigate([`/albums/${album.id}`]),
    submit: (album: Album, formGroup: FormGroup) => this.updateAlbum(album, formGroup),
    delete: (album: Album) => {}
  };
  uploadButtons: UploadButtons = {
    cancel: () => this.cancelCreationAlbum(),
    submit: (file: File) => this.onCreateAlbum(file)
  };
  uploadLabels: UploadLabels = {
    imageBtnLabel: 'Select a cover image',
    nameLabel: 'Name album',
    captionLabel: 'Caption'
  };

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _albumListSandbox: AlbumListSandbox,
    public  afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
    this.albums = this._albumListSandbox.albums$;
    this._albumListSandbox.loadAlbums();
    this.uploadForm = this.buildUploadForm();
  }
  showAlbumForm() {
    this._albumListSandbox.setAlbumForm(true);
  }

  updateAlbum(oldAlbum: Album, formGroup: FormGroup, file?: File) {
    const newAlbum: Album = this.parseFormValue(formGroup.value);
    this._albumListSandbox.updateAlbum(oldAlbum, newAlbum);
  }

  cancelCreationAlbum() {
    this._albumListSandbox.setAlbumForm(false);
    this.uploadForm = this.buildUploadForm();
  }

  onCreateAlbum(file: File) {
    this._albumListSandbox.setProgressbar(true);
    const album = this.parseFormValue(this.uploadForm.value);
    this._albumListSandbox.uploadAlbum(album, file);
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
