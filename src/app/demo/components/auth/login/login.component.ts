import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { loginParams } from '../../models/loginParams';
import { Md5 } from 'ts-md5';
import { AuthService } from '../service/auth.service';
import { TokenStorageService } from '../service/token-storage.service';
// import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

  returnUrl!: string;
  form: loginParams = {
    phoneNumber: null,
    password: null,

  };

  isLoggedIn = false;
  isLoginFailed = false;

    password!: string;

    constructor(private router: Router,  public layoutService: LayoutService, private authService: AuthService, private tokenStorage: TokenStorageService) { }


    onSignUp(from: string){
        this.router.navigate(['/auth/signup'], {  queryParams: { from: from  } });
    }

    onSubmit(): void {
        const md5 = new Md5();
        const hash: string = md5.appendStr(this.form.password ?? "").end()?.toString() ?? "";
        this.form.password = hash ?? "";
        this.authService.login(this.form).subscribe(
          data => {
            console.log("loginComponent", data);
            this.tokenStorage.saveToken(data.token);
            this.tokenStorage.saveUser(data);
            this.form.password = "";
            this.router.navigate([ "/dashboard"],  { replaceUrl: true }, );
          },
          err => {
            this.isLoginFailed = true;
            this.form.password = "";
            // this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
          }
        );
      }
}
