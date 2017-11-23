import {Component, Input, OnInit} from '@angular/core';
import {Album} from 'app/model/album.interface';
import {Image} from 'app/model/image.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UploadLabels } from '../../upload/upload.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() cardObject: Album | Image;
  @Input() actions: {
    handleClickCard: (cardObject) => void;
    submit: (cardObject, formGroup: FormGroup) => void;
    delete: (cardObject) => void;
  };
  @Input() formLabels: UploadLabels;

  formGroup: FormGroup;
  editing = false;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
    this.formGroup.valueChanges.subscribe(x => console.log(x));
  }

  setEditing(show: boolean) {
    this.buildForm();
    this.editing = show;
  }

  private buildForm() {
    this.formGroup = this._fb.group({
      file: '',
      name: [this.cardObject['name'], Validators.required],
      caption: [this.cardObject['caption'], Validators.required],
    });
  }
}
