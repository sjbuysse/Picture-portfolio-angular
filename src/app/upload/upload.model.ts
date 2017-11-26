import {FormGroup} from '@angular/forms';
import { Image } from '../model/image.interface';
import { Album } from '../model/album.interface';

export interface UploadButtons {
  cancel: () => void;
  submit: (formGroup: FormGroup, file: File) => void;
}

export interface UploadLabels {
  imageBtnLabel: string;
  nameLabel: string;
  captionLabel: string;
}
