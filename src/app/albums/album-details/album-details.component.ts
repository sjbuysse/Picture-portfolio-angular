import {Component, OnDestroy, OnInit} from '@angular/core';
import {Album} from 'app/model/album.interface';
import {Image} from 'app/model/image.interface';
import {SelectedAlbumSandbox} from '../../sandboxes/selected-album.sandbox';
import {Observable} from 'rxjs/Observable';
import {SelectedImageSandbox} from '../../sandboxes/selected-image.sandbox';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/first';
import {AngularFireAuth} from 'angularfire2/auth';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {AlbumSandbox} from '../../sandboxes/albums.sandbox';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent implements OnInit, OnDestroy {
  album$: Observable<Album> = this._selectedAlbumSandbox.selectedAlbum$;
  albumDetails$ = this._selectedAlbumSandbox.albumDetails$;
  actions = {
    handleClickCard: (image) => this._selectedImageSandbox.setSelectedImage(image)
  };
  selectedImage$: Observable<Image> = this._selectedImageSandbox.selectedImage$;

  formGroup: FormGroup;

  constructor(private _selectedAlbumSandbox: SelectedAlbumSandbox,
              private _selectedImageSandbox: SelectedImageSandbox,
              private _albumsSandbox: AlbumSandbox,
              private _fb: FormBuilder,
              public  afAuth: AngularFireAuth,
              private _route: ActivatedRoute,
              ) { }

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id');
    this._albumsSandbox.getAlbum(id).first().subscribe(album => this._selectedAlbumSandbox.setSelectedAlbum(album));
    this.buildForm();
  }

  ngOnDestroy(): void {
    this._selectedAlbumSandbox.setSelectedAlbum(null);
    this._selectedImageSandbox.setSelectedImage(null);
  }

  buildForm() {
    this.formGroup = this._fb.group({
      name: '',
      caption: ''
    });
  }

  showImageForm() {
    this._selectedAlbumSandbox.setImageForm(true);
  }

  addImage() {
    this._selectedAlbumSandbox.addNewImage();
  }

  cancelImageAddision() {
    this._selectedAlbumSandbox.setImageForm(false);
    this.buildForm();
  }
}
