import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoaderInfoComponent} from './loader-info.component';
import {LoaderComponent} from '../loader.component';

describe('LoaderInfoComponent', () => {
	let component: LoaderInfoComponent;
	let fixture: ComponentFixture<LoaderInfoComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				LoaderInfoComponent,
				LoaderComponent
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LoaderInfoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
