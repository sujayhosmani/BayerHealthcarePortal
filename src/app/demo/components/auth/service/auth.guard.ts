import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private tokenStorage: TokenStorageService,
    ) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean{
        console.log(state.url);
  
        const currentUser = this.tokenStorage.getToken();
        if (currentUser) {
            console.log(currentUser);
            return true;
            
        }
        this.router.navigate(["/auth/login"], {replaceUrl: true});
        return false;
    }
}