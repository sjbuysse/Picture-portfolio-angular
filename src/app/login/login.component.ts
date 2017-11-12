import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  user: firebase.User;
  angularFireSubscription: Subscription;
  constructor(
    private _afAuth: AngularFireAuth,
    private _fb: FormBuilder
  ) {}

  ngOnInit() {
    this.angularFireSubscription = this._afAuth.authState.subscribe(user => this.user = user);
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.angularFireSubscription.unsubscribe();
  }

  login() {
    const email = this.formGroup.get('email').value;
    const password = this.formGroup.get('password').value;
    this._afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    });
  }

  logout() {
    this._afAuth.auth.signOut().then(this.user = null);
  }

  private buildForm() {
    this.formGroup = this._fb.group({
      email: '',
      password: ''
    });
    this.formGroup.updateValueAndValidity();
  }

}
