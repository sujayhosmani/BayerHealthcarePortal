import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loginParams, Patient } from '../../models/loginParams';
import { TokenStorageService } from '../service/token-storage.service';
import { AuthService } from '../service/auth.service';
import { Md5 } from 'ts-md5';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  genders = ["Male", "Female"];
  form: Patient = {
    age: 0,
    isConsentChecked: false,
    pastHistory: '',
    allergies: '',
    firstName: '',
    phoneNumber: '',
    dob: new Date(),
    gender: '',
    password: '',

   };
  categories = [
    { label: 'Patient', value: 'patient' },
    { label: 'Provider', value: 'provider' }
  ];

  from: string = "patient";

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private authService: AuthService, private tokenStorage: TokenStorageService) 
  { 
    this.route.queryParams.subscribe(params => {
      console.log(params['from']); 
      this.from = params['from'] ?? "patient";
    });
  }

  
  clearDefaults(){

  }

  isSubmitted: boolean = false;
  onSubmit() {
    if(!this.isSubmitted){
      this.isSubmitted = true;
      console.log(this.form);
      const md5 = new Md5();
      const hash: string = md5.appendStr(this.form.password ?? "").end()?.toString() ?? "";
      this.form.password = hash ?? "";
      let proForm: any = this.form;
      proForm.specializedVaccines = [];
      this.authService.pRegister(this.from === 'patient' ? this.form : proForm, this.from).subscribe(
        data => {
          console.log("loginComponent", data);
        
          this.router.navigate([ "/auth/login"], { replaceUrl: true });
        },
        err => {
        
          // this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
        }
      );
    }
    
  }
}
