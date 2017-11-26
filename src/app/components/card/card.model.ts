import { FormGroup } from '@angular/forms';
import { UploadButtons, UploadLabels } from '../../upload/upload.model';
import { Image } from '../../model/image.interface';
import { Album } from '../../model/album.interface';

export interface CardActions {
  handleClickCard: (cardObject) => void;
  delete: (cardObject) => void;
}

export interface Card {
  cardObject: Image | Album;
  uploadButtons: UploadButtons;
  uploadLabels: UploadLabels;
  actions: CardActions;
}
