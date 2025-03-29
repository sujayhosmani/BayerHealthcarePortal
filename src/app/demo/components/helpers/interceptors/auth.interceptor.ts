import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../../auth/service/token-storage.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoaderService } from '../../shared/services/loader.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  deamon!: string;
  constructor(private token: TokenStorageService, private router: Router) {
    
   }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }
    //return next.handle(authReq);
    return new Observable(observer => {
      const subscription = next.handle(authReq)
        .subscribe({
          next: event => {
            if (event instanceof HttpResponse) {
              observer.next(event);
            }
          },
          error: err => {
            if (err instanceof HttpErrorResponse) {
              // this.messageService.clear();
              console.log(err);
              
              if(err.status == 0){
                // this.messageService.add({ severity: 'error', summary: 'error',  detail: 'Could not establish connection'});
              }else if (err.status === 401) {
                this.token.signOut();
                this.router.navigate([ '/auth/login'], {replaceUrl: true});
                // this.messageService.add({ severity: 'error', summary: 'error',  detail: 'Unauthorized'  });
                //window.location.href = "/auth/login";
              }else{
                // this.messageService.add({ severity: 'error', summary: 'error',  detail: err.status + " : " + err.statusText});
              }
            }
            observer.error(err);
          },
          complete: () => {
            observer.complete();
          }
        });
      return () => {
        subscription.unsubscribe();
      }
    })
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];