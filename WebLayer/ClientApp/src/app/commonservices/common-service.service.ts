import { Injectable, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CommonServiceService {
  public announceLogiComponentLoaded = new Subject<boolean>();
  public HomeComponentLoaded = new Subject<boolean>();
  public isUserLoggedIn= new Subject<boolean>();
  public RowSelectedInFetchDataEvent= new Subject<number>();
  constructor() { }

  public  loginCoponentLoadedEvent(isComponentLoaded: boolean) {
    this.announceLogiComponentLoaded.next(isComponentLoaded);
  }


  public HomeComponentLoadedEvent(isComponentLoaded: boolean) {
    this.HomeComponentLoaded.next(isComponentLoaded);
  }

  public UserLoggedInEvent(isUserLoggedIn: boolean) {
    this.isUserLoggedIn.next(isUserLoggedIn);
  }

  public RowSelectedInFetchData(rowID: number) {
  this.RowSelectedInFetchDataEvent.next(rowID);
  }

}
