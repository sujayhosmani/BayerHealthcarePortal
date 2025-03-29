import { Injectable } from '@angular/core';


const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {



  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): any | null {
    return window.sessionStorage.getItem(TOKEN_KEY); 
  }


  public getRole(): any | null {
    let val = window.sessionStorage.getItem(TOKEN_KEY); 
    if(val){
      val = atob(val.split('.')[1]);
      let jCur = JSON.parse(val);
      let role = jCur['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      return role;
    }
    return null;
  }

  public getReadableToken(): any | null {
    let val = window.sessionStorage.getItem(TOKEN_KEY); 
    if(val){
      val = atob(val.split('.')[1]);
      let jCur = JSON.parse(val);
      return jCur;
    }
    return null;
  }

  

  

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  


}
