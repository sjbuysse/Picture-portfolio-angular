import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { UploadLabels, UploadButtons } from './upload.model';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() buttons: UploadButtons;
  @Input() formLabels: UploadLabels;
  @Input() uploadProgress: number;
  @Input() showProgressbar: boolean;
  @Input() isUploading: boolean;

  @Output() cancel: EventEmitter<Event> = new EventEmitter();

  selectedFile: File;
  previewImage: object;
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  onCancel(event: Event) {
    this.cancel.emit(event);
  }
  // Imitate clicking on the input element, when clicking on styled faked button
  clickFileElem(event: Event) {
    const newEvent = new MouseEvent('click', {bubbles: true});
    this.fileInput.nativeElement.dispatchEvent(newEvent);
  }

  setFile(event) {
    event.preventDefault();
    this.selectedFile = event.srcElement.files[0];
    this.formGroup.get('file').setValue(this.selectedFile ? this.selectedFile.name : '');
    this.readSelectedFile(this.selectedFile).then(result => this.previewImage = result);
  }

  private readSelectedFile(selectedFile): Promise<object> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        resolve(event.target.result);
      };
      // Read in the image file as a data URL.
      reader.readAsDataURL(selectedFile);
    });
  }


}
