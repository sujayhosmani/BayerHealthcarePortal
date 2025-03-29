import {NgModule} from '@angular/core';
import { LoaderComponent } from './loader.component';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [LoaderComponent],
    exports: [LoaderComponent],
    imports: [
        CommonModule,
        BlockUIModule,
        ProgressSpinnerModule
    ]
})
export class LoaderModule { }