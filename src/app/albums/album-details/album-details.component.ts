import {Component, OnDestroy, OnInit} from '@angular/core';
import {Album} from 'app/model/album.interface';
import {Image} from 'app/model/image.interface';
import {SelectedAlbumSandbox} from '../../sandboxes/selected-album.sandbox';
import {Observable} from 'rxjs/Observable';
import {SelectedImageSandbox} from '../../sandboxes/selected-image.sandbox';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/first';
import {AngularFireAuth} from 'angularfire2/auth';
import {AlbumSandbox} from '../../sandboxes/albums.sandbox';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent implements OnInit, OnDestroy {
  album$: Observable<Album> = this._selectedAlbumSandbox.selectedAlbum$;
  actions = {
    handleClickCard: (image) => this._selectedImageSandbox.setSelectedImage(image)
  };
  selectedImage$: Observable<Image> = this._selectedImageSandbox.selectedImage$;

  constructor(private _selectedAlbumSandbox: SelectedAlbumSandbox,
              private _selectedImageSandbox: SelectedImageSandbox,
              public  afAuth: AngularFireAuth
              ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this._selectedAlbumSandbox.setSelectedAlbum(null);
    this._selectedImageSandbox.setSelectedImage(null);
  }

  addImage() {
    this._selectedAlbumSandbox.addNewImage();
  }
}
