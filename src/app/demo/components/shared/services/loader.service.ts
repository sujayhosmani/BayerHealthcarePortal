import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading = new BehaviorSubject<boolean>(false);
  deamonName = new BehaviorSubject<string>("school");
  isShowFullPageLoader = true;
}
