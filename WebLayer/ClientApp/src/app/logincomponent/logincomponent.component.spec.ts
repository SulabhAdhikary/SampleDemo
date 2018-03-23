/* tslint:disable:prefer-const*/
 /* tslint:disable:no-inferrable-types*/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { LogincomponentComponent } from './logincomponent.component';
import { EmptyTagComponent } from './../empty-tag/empty-tag.component';
import {FieldErrorDisplayComponent} from './../field-error-display/field-error-display.component';
import { FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonServiceService } from './../commonservices/common-service.service';
import { AuthenticationService } from './../commonservices/AuthenticationService';
import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import { PersistStorageUtility } from '../commonservices/PersistInStorage';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import { ReflectiveInjector } from '@angular/core';











describe('LogincomponentComponent', () => {
  let component: LogincomponentComponent;
  let fixture: ComponentFixture<LogincomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule, RouterTestingModule],
      declarations: [LogincomponentComponent, EmptyTagComponent, FieldErrorDisplayComponent],
      providers: [CommonServiceService, AuthenticationService,
        { provide: 'BASE_URL', useValue: 'BASE_URL'},
        { provide: 'LocalStorage_Name', useValue: 'currentuser'}, PersistStorageUtility
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogincomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});





describe('check login functionality', () => {


class  PseduAuthenticationService {

  login(username: string, password: string): Observable<boolean> {
  return new Observable<boolean>( observer => {
    observer.next(false);
    });
  }
}


  let commService: CommonServiceService;
  let fixture: ComponentFixture<LogincomponentComponent>;
  let component: LogincomponentComponent;
  let authService: AuthenticationService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule, RouterTestingModule],
      declarations: [LogincomponentComponent, EmptyTagComponent, FieldErrorDisplayComponent],
      providers: [
        CommonServiceService ,
         AuthenticationService ,
        { provide: 'BASE_URL', useValue: 'BASE_URL'},
        { provide: 'LocalStorage_Name', useValue: 'currentuser'}, PersistStorageUtility
      ]
    })
    .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(LogincomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('user is not logged in ', () => {
    authService = TestBed.get(AuthenticationService);
    spyOn(authService, 'login').and.returnValue(new Observable<boolean>( observer => {
      observer.next(false);
      }));
      component.isUserSuccessfullyLoggedIn();

      expect(component.isSucessfullyLoggedIn).toBe(false);
  });

  it('user should be checked in ', () => {

    authService = TestBed.get(AuthenticationService);
    spyOn(authService, 'login').and.returnValue(new Observable<boolean>( observer => {
      observer.next(true);
      }));
      component.isUserSuccessfullyLoggedIn().subscribe(data => {
        expect(component.isSucessfullyLoggedIn).toBe(true);
      });
    });
});
