import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {LoaderOptions} from './loader.model';
import {shareReplay} from 'rxjs/operators';

@Component({
	selector: 'arz-loader',
	templateUrl: './loader.component.html',
	styleUrls: ['./loader.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class LoaderComponent implements OnInit {
	@Input() isBusy: boolean;
	@Input() options: LoaderOptions;

	constructor() {
	}

	ngOnInit() {
		this.options = Object.assign({}, {
			size: '40',
			backgroundColor: 'light',
			borderWidth: '4',
			movingColor: 'primary'
		}, this.options);
	}
}
