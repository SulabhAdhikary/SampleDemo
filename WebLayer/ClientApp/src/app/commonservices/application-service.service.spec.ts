import { TestBed, inject } from '@angular/core/testing';
import {  HttpClientModule } from '@angular/common/http';
import { ApplicationServiceService } from './application-service.service';



describe('ApplicationServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ApplicationServiceService,
        { provide: 'BASE_URL', useValue: 'BASE_URL'}
      ]
    });
  });

  it('should be created', inject([ApplicationServiceService], (service: ApplicationServiceService) => {
    expect(service).toBeTruthy();
  }));
});
