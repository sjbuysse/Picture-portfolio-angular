import {Injectable, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from 'app/statemanagement/state/app.state';
import * as selectedImageActions from '../statemanagement/actions/data/selected-image.actions';
import { Image } from 'app/model/image.interface';

@Injectable()
export class SelectedImageSandbox implements OnInit {
  selectedImage$ = this.store.select(state => state.data.selectedImage);

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
  }

  setSelectedImage(image: Image) {
    this.store.dispatch(new selectedImageActions.SetSelectedImage(image));
  }
}
