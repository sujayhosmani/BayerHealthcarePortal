import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { LoaderModule } from "./demo/components/shared/components/loader/loader.module";
import { VaccineMastersComponent } from './demo/components/vaccine-masters/vaccine-masters.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './demo/components/helpers/interceptors/loader.interceptor';
import { authInterceptorProviders } from './demo/components/helpers/interceptors/auth.interceptor';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';


@NgModule({
    declarations: [
        AppComponent, NotfoundComponent, VaccineMastersComponent
    ],
    imports: [
    AppRoutingModule,
    AppLayoutModule,
    LoaderModule,
    CommonModule,
    RippleModule,
    FormsModule,
    StyleClassModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    DialogModule
],
    providers: [
        // { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, authInterceptorProviders, ProductService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
