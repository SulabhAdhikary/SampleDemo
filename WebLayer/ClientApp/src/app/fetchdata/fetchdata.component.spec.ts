 /* tslint:disable:prefer-const */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FetchdataComponent } from './fetchdata.component';
import { ApplicationServiceService } from '../commonservices/application-service.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { CommonServiceService } from '../commonservices/common-service.service';

describe('FetchdataComponent', () => {
  let component: FetchdataComponent;
  let fixture: ComponentFixture<FetchdataComponent>;


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ FetchdataComponent ],
      providers: [CommonServiceService, ApplicationServiceService, HttpClient,
        { provide: 'BASE_URL', useValue: 'BASE_URL'},
        { provide: 'LocalStorage_Name', useValue: 'currentuser'}]
    })
    .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(FetchdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
