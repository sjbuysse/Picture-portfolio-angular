import {FormGroup} from '@angular/forms';

export interface UploadButtons {
  cancel: () => void;
  submit: (file: File) => void;
}

export interface UploadLabels {
  imageBtnLabel: string;
  nameLabel: string;
  captionLabel: string;
}
