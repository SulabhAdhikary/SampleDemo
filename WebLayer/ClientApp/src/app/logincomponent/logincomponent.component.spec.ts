import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogincomponentComponent } from './logincomponent.component';
import { EmptyTagComponent } from './../empty-tag/empty-tag.component';
import {FieldErrorDisplayComponent} from './../field-error-display/field-error-display.component';
import { FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonServiceService } from './../commonservices/common-service.service';
import { AuthenticationService } from './../commonservices/AuthenticationService';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import { PersistStorageUtility } from '../commonservices/PersistInStorage';

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
