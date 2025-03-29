import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { TokenStorageService } from '../demo/components/auth/service/token-storage.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    name: string = '';
    role: string = '';

    constructor(public layoutService: LayoutService, private storage: TokenStorageService) { 
        const user = this.storage.getUser();
        this.name = user.firstName;
        this.role = this.storage.getRole();
    }
}
