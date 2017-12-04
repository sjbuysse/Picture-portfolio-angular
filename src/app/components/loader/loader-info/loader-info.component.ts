import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LoaderOptions} from '../loader.model';
import {ReplaySubject} from 'rxjs/ReplaySubject';

@Component({
	selector: 'arz-loader-info',
	templateUrl: './loader-info.component.html',
	styleUrls: ['./loader-info.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class LoaderInfoComponent implements OnInit {
	isDefaultBusy$ = new ReplaySubject(1);
	isCustomizedBusy$ = new ReplaySubject(1);
	options: LoaderOptions = {
		size: '30',
		borderWidth: '3',
		movingColor: 'warning',
		backgroundColor: 'secondary'
	}

	constructor() {
	}

	ngOnInit() {
		this.isDefaultBusy$.next(true);
		this.isCustomizedBusy$.next(true);
	}

	setBusy(subject: ReplaySubject<boolean>, busy: boolean) {
		subject.next(busy);
	}
}
