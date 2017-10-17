import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Image} from '../../statemanagement/state/data/data.state';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ModalService {

  _image = new Subject<Image>();

  constructor() { }

  setSelectedImage(newImage: Image) {
    this._image.next(newImage);
  }

  getSelectedImage(): Observable<Image> {
    return this._image.asObservable();
  }
}
