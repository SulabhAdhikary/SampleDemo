  /* tslint:disable:no-inferrable-types */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonServiceService } from '../commonservices/common-service.service';
import { Subscription } from 'rxjs/Subscription';
import {PersistStorageUtility  } from '../commonservices/PersistInStorage';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {


  showLoginButton: boolean = true;
  IsUserLoggedIn: boolean = false;
  constructor(private activatedRoute: ActivatedRoute ,
            private router: Router,
            private commonService: CommonServiceService,
            private authPsedu: PersistStorageUtility ) {
              this.commonService.isUserLoggedIn.subscribe(data => this.CheckUserLoggedIn());

  }

  ngOnInit() {
    this.CheckUserLoggedIn();
    this.commonService.announceLogiComponentLoaded.subscribe(t => this.ShowHideLoginButton(t));
  }


  ShowHideLoginButton(retValue: boolean) {
    this.showLoginButton = !retValue;
  }


  LoginClick() {
    this.router.navigate(['Login']);
  }

  LogoutClick() {
     this.authPsedu.LogOutCurrentUser();
     this.CheckUserLoggedIn();
     this.router.navigate(['Home']);
  }

  CheckUserLoggedIn() {
    this.IsUserLoggedIn = this.authPsedu.IsUserLoggedIn();
  }
}
