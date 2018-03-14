import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EmptyTagComponent } from './empty-tag/empty-tag.component';
import { CentreContentComponent } from './centre-content/centre-content.component';
import { LogincomponentComponent } from './logincomponent/logincomponent.component';
import { ApplicationServiceService } from './commonservices/application-service.service';
import { CommonServiceService } from './commonservices/common-service.service';
import { AuthenticationService } from './commonservices/AuthenticationService';
import { PersistStorageUtility } from './commonservices/PersistInStorage';
import { FetchdataComponent } from './fetchdata/fetchdata.component';
import { CcCardHoveDirective } from './ccCardHoverDirective/cc-card-hove.directive';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './commonservices/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FieldErrorDisplayComponent,
    EmptyTagComponent,
    CentreContentComponent,
    LogincomponentComponent,
    FetchdataComponent,
    CcCardHoveDirective
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    RouterModule.forRoot([

      { path: '', component: CentreContentComponent, pathMatch: 'full' },
      { path: 'Home', component: CentreContentComponent },
      { path: 'Login', component: LogincomponentComponent },
      { path: 'FetchData', component: FetchdataComponent }
    ])
  ],
  providers: [ApplicationServiceService, CommonServiceService, AuthenticationService,
    { provide: 'LocalStorage_Name', useValue: 'currentUser'}, PersistStorageUtility,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
