import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  user: firebase.User;

  constructor(
    private _afAuth: AngularFireAuth,
    private _fb: FormBuilder
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  login() {
    const email = this.formGroup.get('email').value;
    const password = this.formGroup.get('password').value;
    this._afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => this.user = user)
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
