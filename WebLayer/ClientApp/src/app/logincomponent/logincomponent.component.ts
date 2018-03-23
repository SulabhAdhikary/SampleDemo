 /* tslint:disable:no-inferrable-types*/

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonServiceService } from '../commonservices/common-service.service';
import { AuthenticationService } from './../commonservices/AuthenticationService';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-logincomponent',
  templateUrl: './logincomponent.component.html',
  styleUrls: ['./logincomponent.component.css']
})
export class LogincomponentComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  UserName: FormControl;
  Password: FormControl;
  error: String;
  loading = false;
  isSucessfullyLoggedIn: boolean = false;

  constructor(private commonService: CommonServiceService,
              private authenticationService: AuthenticationService,
              private router: Router) {


  }

  ngOnInit() {

    this. createFormControls();
    this.constructForm();
    this.commonService.loginCoponentLoadedEvent(true);
  }




  constructForm() {
    this.loginForm = new FormGroup({
      UserName: this.UserName,
      Password: this.Password
    });
  }

  createFormControls() {
   this.UserName = new FormControl('', Validators.required);
   this.Password = new FormControl('', Validators.required);
  }

  ngOnDestroy() {
    this.commonService.loginCoponentLoadedEvent(false);
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  isFieldValid(field: string) {
    return !this.loginForm.get(field).valid && this.loginForm.get(field).touched;
  }


/*
   onSubmit() {
  if (this.loginForm.valid) {
     this.loading = true;
      if (this.isUserSuccessfullyLoggedIn()) {
            this.commonService.UserLoggedInEvent(true);
            this.router.navigate(['Home']);
        } else {
            // login failed
            this.error = 'Username or password is incorrect';
            this.loading = false;
        }
    } else {
      Object.keys(this.loginForm.controls).forEach(field => {
        const control = this.loginForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }*/



  onSubmit() {
  if (this.loginForm.valid) {
    this.loading = true;
    this.isUserSuccessfullyLoggedIn().subscribe(data => {
      // tslint:disable-next-line:triple-equals
      if (this.isSucessfullyLoggedIn == true) {
        this.commonService.UserLoggedInEvent(true);
        this.router.navigate(['Home']);
       }else {
        this.error = 'Username or password is incorrect';
        this.loading = false;
       }
    });
    } else {
      Object.keys(this.loginForm.controls).forEach(field => {
        const control = this.loginForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }



   isUserSuccessfullyLoggedIn(): Observable<void> {
   return   this.authenticationService.login(this.UserName.value, this.Password.value)
    .map(result => {
        this.isSucessfullyLoggedIn = result;
      });
  }
}







