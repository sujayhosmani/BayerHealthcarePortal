import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { SignUpRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';

@NgModule({
    imports: [
        CommonModule,
        SignUpRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    DropdownModule,
    ButtonModule,
    CardModule
    ],
    declarations: [SignupComponent]
})
export class SignUpModule { }
