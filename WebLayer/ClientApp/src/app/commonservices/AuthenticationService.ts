 /* tslint:disable:prefer-const */
  /* tslint:disable:no-inferrable-types */

import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpResponse  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { PersistStorageUtility } from './PersistInStorage';

@Injectable()
export class AuthenticationService {
    public token: string;


    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl, private _persistantStorage: PersistStorageUtility) {
        // set token if saved in local storage

    }

login(username: string, password: string): Observable<boolean> {

    let successFulLogin: boolean = false;
    const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            })
          };

         return this.http.post('api/Token/CreateToken', JSON.stringify({ username: username, password: password }), httpOptions)
            .map((response: Response) => {
                const currentUserString: any = JSON.stringify(response);
                if (response && response['token'] && response['token'].length > 1) {
                    this.token = response['token'];
                    this._persistantStorage.SaveInLocalStorage(username, response['token']);
                    return   true;
                }else {
                    return  false;
                }
            });

    }


    getLoginSession(username: string, password: string) {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            })
          };

        return this.http.post('api/Token/CreateToken', JSON.stringify({ username: username, password: password }), httpOptions)
            .map((response: Response) => response);
    }

}
