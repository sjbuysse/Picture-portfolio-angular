import {Component, Input, OnInit} from '@angular/core';
import {Album} from 'app/model/album.interface';
import {Image} from 'app/model/image.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() cardObject: Album | Image;
  @Input() actions: {handleClickCard: (cardObject) => void};

  constructor() { }

  ngOnInit() {
  }

}
