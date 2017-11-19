import {FormGroup} from '@angular/forms';

export interface UploadButtons {
  cancel: () => void;
  submit: (file: File) => void;
}
