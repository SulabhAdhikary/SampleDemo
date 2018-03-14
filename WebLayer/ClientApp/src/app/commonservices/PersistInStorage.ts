import { Injectable, Inject } from '@angular/core';



@Injectable()
export class PersistStorageUtility {
     _localStorage: string;


    constructor(@Inject('LocalStorage_Name') localstorageName: string) {
      this._localStorage = localstorageName;
    }

    public SaveInLocalStorage(userName: string, token: string ) {

        localStorage.setItem('currentUser', JSON.stringify({ username: userName, token: token }));
    }

    public GetTokenFromLocalStorage(): string {

        const currentUser = JSON.parse(localStorage.getItem(this._localStorage));
        if (currentUser != null) {
        const token: string = currentUser && currentUser.token;
        return  currentUser.token;
        }
        return '';
    }

    public  IsUserLoggedIn(): boolean {
        const currentUser = JSON.parse(localStorage.getItem(this._localStorage));
        const token: string = currentUser && currentUser.token;
        if ( currentUser && currentUser.token) {
            return  currentUser.token.length > 1;
        }
        return false;
    }

    public LogOutCurrentUser() {
        localStorage.removeItem(this._localStorage);
    }

}
