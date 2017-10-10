import {Component, Input, OnInit} from '@angular/core';
import {Album, Image} from '../../statemanagement/state/data/data.state';

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
