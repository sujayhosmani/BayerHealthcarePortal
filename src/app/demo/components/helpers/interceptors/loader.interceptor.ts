import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoaderService } from "../../shared/services/loader.service";



@Injectable()
export class LoaderInterceptor implements HttpInterceptor{
    private requests: HttpRequest<unknown>[] = [];

    constructor(private readonly loaderService: LoaderService) {}

    removeRequest(req: HttpRequest<unknown>): void {
        const i = this.requests.indexOf(req);
        if (i >= 0){
            this.requests.splice(i, 1);
        }
        this.loaderService.isLoading.next(this.requests.length > 0);
    }

    intercept(req: HttpRequest<unknown>, next : HttpHandler): Observable<HttpEvent<unknown>> {
        if (this.loaderService.isShowFullPageLoader){
            this.requests.push(req);
            this.loaderService.isLoading.next(true);
        }

        return new Observable(observer => {
            const subscription = next.handle(req)
            .subscribe({
                next: event => {
                    if (event instanceof HttpResponse) {
                        this.removeRequest(req);
                        observer.next(event);
                    }
                },
                error: err => {
                    this.removeRequest(req);
                    observer.error(err);
                },
                complete: () => {
                    this.removeRequest(req);
                    observer.complete();
                }
            });
            return () => {
                this.removeRequest(req);
                subscription.unsubscribe();
            }
        })
    }

}