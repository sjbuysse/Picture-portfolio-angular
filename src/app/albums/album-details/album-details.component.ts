import {Component, OnDestroy, OnInit} from '@angular/core';
import {Album} from 'app/model/album.interface';
import { createImage, Image } from 'app/model/image.interface';
import {SelectedAlbumSandbox} from '../../sandboxes/album-details.sandbox';
import {Observable} from 'rxjs/Observable';
import {SelectedImageSandbox} from '../../sandboxes/selected-image.sandbox';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/first';
import {AngularFireAuth} from 'angularfire2/auth';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {AlbumListSandbox} from '../../sandboxes/album-list.sandbox';
import { UploadButtons, UploadLabels } from '../../upload/upload.model';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent implements OnInit, OnDestroy {
  album$: Observable<Album> = this._selectedAlbumSandbox.selectedAlbum$;
  albumDetails$ = this._selectedAlbumSandbox.albumDetails$;
  actions = {
    handleClickCard: (image: Image) => this._selectedImageSandbox.setSelectedImage(image),
    submit: (image: Image, formGroup: FormGroup) => this.updateImage(image, formGroup),
    delete: (image: Image) => {}
  };
  selectedImage$: Observable<Image> = this._selectedImageSandbox.selectedImage$;

  uploadProgress: number;
  uploadForm: FormGroup;
  uploadButtons: UploadButtons = {
    cancel: () => this.cancelImageAddision(),
    submit: (formGroup: FormGroup, file: File) => this.onSubmitUpload(file)
  };
  uploadLabels: UploadLabels = {
    imageBtnLabel: 'Select an image',
    nameLabel: 'Name picture',
    captionLabel: 'Caption'
  };

  constructor(private _selectedAlbumSandbox: SelectedAlbumSandbox,
              private _selectedImageSandbox: SelectedImageSandbox,
              private _albumsSandbox: AlbumListSandbox,
              public  afAuth: AngularFireAuth,
              private _route: ActivatedRoute,
              private _fb: FormBuilder,
              ) { }

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id');
    this._selectedAlbumSandbox.loadAlbumDetails(id);
    this.uploadForm = this.buildUploadForm();
  }

  buildUploadForm() {
    return this._fb.group({
      name: ['', Validators.required],
      caption: ['', Validators.required],
      file: ['', Validators.required]
    });
  }

  ngOnDestroy(): void {
  }

  onSubmitUpload(file: File) {
    this._selectedAlbumSandbox.setProgressbar(true);
    const image = this.parseFormValue(this.uploadForm.value);
    this._selectedAlbumSandbox.uploadImage(file, image);
  }

  updateImage(oldImage: Image, formGroup: FormGroup) {
    const newImage: Image = this.parseFormValue(formGroup.value);
    this.album$.first().subscribe(album =>
      this._selectedAlbumSandbox.updateImage(oldImage, newImage,  album)
    );
  }

  showImageForm() {
    this._selectedAlbumSandbox.setImageForm(true);
  }

  cancelImageAddision() {
    this._selectedAlbumSandbox.setImageForm(false);
    this.uploadForm = this.buildUploadForm();
  }

  private parseFormValue(formValue: any): Image {
    delete formValue.file;
    return Object.assign({}, formValue);
  }
}
