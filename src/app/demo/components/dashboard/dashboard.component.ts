import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { CoreNetworkService } from '../shared/services/core.network.service';
import { VaccinationSubmissions } from './vaccinations/vaccinations.component';
import { TokenStorageService } from '../auth/service/token-storage.service';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];
    vaccinesSubmissions: VaccinationSubmissions[] = [];
    pending: string = '0';
    scheduled: string = '0';
    id: string = '';

    subscription!: Subscription;

    constructor(private network: CoreNetworkService, public layoutService: LayoutService, tokenStorage: TokenStorageService) {
        const user = tokenStorage.getReadableToken();
        console.log(user);
        this.id = user.Id;
    }

    ngOnInit() {
        this.getAll();
        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];
    }



    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    getAll(){
    
        this.network.getAll('VaccineSubmission/vaccine/submission').subscribe((response: any) => {
          console.log(response);
          this.vaccinesSubmissions = response;
          this.vaccinesSubmissions = this.vaccinesSubmissions.filter(e => e.patientId === this.id);  
          this.pending = this.vaccinesSubmissions.filter(e => e.status === 'Pending').length.toString();
          this.scheduled = this.vaccinesSubmissions.filter(e => e.status === 'Scheduled').length.toString();
        }
        );
      }
}
