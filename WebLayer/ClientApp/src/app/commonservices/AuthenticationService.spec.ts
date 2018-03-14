
 /* tslint:disable:prefer-const */

import { TestBed, inject } from '@angular/core/testing';
import { AuthenticationService } from './AuthenticationService';
import { PersistStorageUtility } from './PersistInStorage';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';



describe('ApplicationServiceService', () => {

    let service: AuthenticationService;
    let httpMock: HttpTestingController;
    let mockPersistanceStorage: PersistStorageUtility;
    let spy: any;

    beforeEach (() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService, PersistStorageUtility,
        { provide: 'BASE_URL', useValue: 'BASE_URL'},
        { provide: 'LocalStorage_Name', useValue: 'currentUser'}
      ]
    });
    httpMock = TestBed.get(HttpTestingController);
    mockPersistanceStorage = new PersistStorageUtility('currentUser');
    service = TestBed.get(AuthenticationService);
  });


    afterEach(() => {
    mockPersistanceStorage = null;
    service = null;
    });

    it('checklogin', () => {
        service.getLoginSession('username', 'password' ).subscribe((data: any) => {
            expect(data.firstname).toBe('firstname');
    });

    const req = httpMock.expectOne(`api/Token/CreateToken`, 'post to api');
    expect(req.request.method).toBe('POST');

    req.flush({
        firstname: 'firstname'
      });

      httpMock.verify();

});

});
