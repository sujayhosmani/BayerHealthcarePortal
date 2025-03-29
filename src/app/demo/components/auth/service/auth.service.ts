import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { httpOptions } from '../../helpers/constants/constants';
import { loginParams, Patient } from '../../models/loginParams';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = `${environment.baseUrl}login/auth`;
  private patientRegisterUrl = `${environment.baseUrl}login/register/patient`;
  private providerRegisterUrl = `${environment.baseUrl}login/register/provider`;
  constructor(private http: HttpClient) { }

  login(reqParams: loginParams): Observable<any> {
    return this.http.post(this.loginUrl, reqParams, httpOptions).pipe(map((response) => {
      return response;
    }));
  }

  pRegister(reqParams: Patient, from: string): Observable<any> {
    return this.http.post(from === 'patient' ? this.patientRegisterUrl : this.providerRegisterUrl, reqParams, httpOptions).pipe(map((response) => {
      return response;
    }));
  }

}
