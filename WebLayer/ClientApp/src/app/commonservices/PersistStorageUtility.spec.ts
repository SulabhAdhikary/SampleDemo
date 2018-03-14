
import { TestBed, inject } from '@angular/core/testing';

import { PersistStorageUtility } from './PersistInStorage';


describe('PersistStorageUtility', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersistStorageUtility,
        { provide: 'LocalStorage_Name', useValue: 'currentUser'}]
    });
  });

  it('PersistServiceCreated', inject([PersistStorageUtility], (service: PersistStorageUtility) => {
    expect(service).toBeTruthy();
  }));

  it('should return true from isAuthenticated when there is a token', inject([PersistStorageUtility], (service: PersistStorageUtility) => {

    localStorage.setItem('currentUser', JSON.stringify({ username: 'sulabh', token: '1234' }));
    expect(service.IsUserLoggedIn()).toBeTruthy();
    }));


    it('GetToken', inject([PersistStorageUtility], (service: PersistStorageUtility) => {
      localStorage.setItem('currentUser', JSON.stringify({ username: 'sulabh', token: '1234' }));
      expect(service.GetTokenFromLocalStorage()).toEqual('1234');
      }));

    it('checkToeknSavedlogic', inject([PersistStorageUtility], (service: PersistStorageUtility) => {
      service.SaveInLocalStorage('sulabh', '123456');
      // tslint:disable-next-line:prefer-const
      let myuser = JSON.parse(localStorage.getItem('currentUser'));
      expect(myuser.token).toEqual('123456');
    }));

  });
