import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { httpOptions } from "../../helpers/constants/constants";

@Injectable({
    providedIn: 'root'
})
export class CoreNetworkService {

    constructor(private http: HttpClient) { }

    insert(val?: any, url: string = ""): Observable<any> {
        console.log(val.fromDate);
    console.log(val.toDate);
        return this.http.post(environment.baseUrl + url, val, httpOptions).pipe(map((response) => {
            return response;
        }));
    }

   
    insertMultiPart(val?: any, url: string = ""): Observable<any> {
        const httpOptions2 = {
            headers: new HttpHeaders({ 'accept': '*/*' })
          };
        return this.http.post(environment.baseUrl + url, val, httpOptions2).pipe(map((response) => {
            return response;
        }));
    }
    getAll(url: string = ""): Observable<any> {
        return this.http.get(environment.baseUrl + url, httpOptions);
    }

    update(value?: any, url: string = ""): Observable<any> {
        return this.http.put(environment.baseUrl + url, value, httpOptions).pipe(map((response) => {
            return response;
        }));
    }

    delete(url: string = ""): Observable<any> {
        return this.http.delete(environment.baseUrl + url, httpOptions).pipe(map((response) => {
            return response; 
        }));
    }

    deleteWithBody(value?: any, url: string = ""): Observable<any> {
        return this.http.put(environment.baseUrl + url, value, httpOptions).pipe(map((response) => {
            return response; 
        }));
    }
}