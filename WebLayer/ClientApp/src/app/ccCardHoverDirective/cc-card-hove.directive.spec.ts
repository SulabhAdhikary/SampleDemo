 /* tslint:disable:prefer-const*/

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CcCardHoveDirective } from './cc-card-hove.directive';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AuthenticationService } from '../commonservices/AuthenticationService';
import { CommonServiceService } from '../commonservices/common-service.service';
import { PersistStorageUtility } from '../commonservices/PersistInStorage';


@Component({
  template: `<table><tr><td appCcCardHove class="clsone"> abcdef</td></tr></table>`
})
class TestHoverFocusComponent {
}


describe('CcCardHoveDirective', () => {

  let component: TestHoverFocusComponent;
  let fixture: ComponentFixture<TestHoverFocusComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestHoverFocusComponent, CcCardHoveDirective],
      providers: [CommonServiceService, AuthenticationService,
        { provide: 'BASE_URL', useValue: 'BASE_URL'},
        { provide: 'LocalStorage_Name', useValue: 'currentuser'}, PersistStorageUtility
      ]
    });
    fixture = TestBed.createComponent(TestHoverFocusComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('.clsone'));
  });

  it('should create an instance', () => {
    inputEl.triggerEventHandler('mouseover', null);
    fixture.detectChanges();
    expect(inputEl.nativeElement.style.backgroundColor).toBe('white');
  });
});
