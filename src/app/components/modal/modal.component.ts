import {Component, Input, OnInit} from '@angular/core';
import {Image} from 'app/model/image.interface';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() image: Observable<Image>;

  constructor() { }

  ngOnInit() {
  }

}
