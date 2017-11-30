import {Component, Input, OnInit} from '@angular/core';
import {Album} from 'app/model/album.interface';
import {Image} from 'app/model/image.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UploadButtons, UploadLabels } from '../../upload/upload.model';
import { CardActions } from 'app/components/card/card.model';
import { CardState } from 'app/statemanagement/state/containers/album-list.state';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() cardObject: Album | Image;
  @Input() actions: CardActions;
  @Input() uploadButtons: UploadButtons;
  @Input() uploadLabels: UploadLabels;
  @Input() cardState: CardState;

  formGroup: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
    if (this.cardState) {
    }
  }

  onCancel() {
    this.uploadButtons.cancel();
    this.buildForm();
  }

  onSubmit(file: File) {
    this.uploadButtons.submit(this.formGroup, file);
  }

  private buildForm() {
    this.formGroup = this._fb.group({
      file: '',
      name: [this.cardObject['name'], Validators.required],
      caption: [this.cardObject['caption'], Validators.required],
    });
  }
}
