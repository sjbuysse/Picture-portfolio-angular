import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UploadButtons} from './upload.model';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() buttons: UploadButtons;
  @Input() uploadProgress: number;
  @Input() showProgressbar: boolean;

  selectedFile: File;
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor() { }

  ngOnInit() {
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
  }


}
