import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { TokenStorageService } from '../demo/components/auth/service/token-storage.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    role: string = '';
    constructor(public layoutService: LayoutService, private storage: TokenStorageService) {
        const user = this.storage.getUser();
        this.role = this.storage.getRole(); 
     }

    ngOnInit() {
        this.role = this.storage.getRole();
        if(this.role === 'HealthProviders'){
            this.model = [
                {
                    label: 'Home',
                    items: [
                        { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] },
                        { label: 'Vaccines Masters', icon: 'pi pi-fw pi-home', routerLink: ['/vaccines'] },
                        { label: 'Profile', icon: 'pi pi-fw pi-home', routerLink: ['/profile'] }
                    ]
                }
            ];
        }else{
            this.model = [
                {
                    label: 'Home',
                    items: [
                        { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] },
                        { label: 'Profile', icon: 'pi pi-fw pi-home', routerLink: ['/profile'] }
                    ]
                }
            ];
        }
        
    }
}
