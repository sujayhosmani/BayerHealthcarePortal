import { Component, Input } from '@angular/core';
import { CoreNetworkService } from '../../shared/services/core.network.service';
import { TokenStorageService } from '../../auth/service/token-storage.service';
import { VaccinationMaster } from '../../models/vaccines-masters';
import { vaccinePost } from '../../helpers/constants/constants';

@Component({
  selector: 'app-vaccinations',
  templateUrl: './vaccinations.component.html',
  styleUrl: './vaccinations.component.scss'
})
export class VaccinationsComponent {
  @Input() vaccinesSubmissions: VaccinationSubmissions[] = [];
   vaccines: VaccinationMaster[] = [];
  visible = false;
  form: VaccinationSubmissions = {
    healthProviderId: "",
    isVaccinated: false,
    patientId: "",
    status: "Pending",
    vaccinationDate: new Date().toISOString(),
    vaccineId: "",
    vaccineName: ""


  }


    id: string = '';
    constructor(private network: CoreNetworkService, tokenStorage: TokenStorageService) {
      const user = tokenStorage.getReadableToken();
      console.log(user);
      this.id = user.Id;
      this.getAllVacc();
    }

  

  onItemSubmit(){
    console.log(this.form);
    let id = this.form.vaccineId.id;
    let name = this.form.vaccineId.vaccineName;
    this.form.vaccineId = id;
    this.form.vaccineName = name;
    this.form.patientId = this.id;
    console.log(this.form);
    this.network.insert(this.form, 'VaccineSubmission/vaccine/submission').subscribe((response: any) => {
      console.log(response);
      this.vaccines.push(response);
    }
    );

  }

  getAllVacc(){
        this.network.getAll(vaccinePost).subscribe((response: any) => {
          console.log(response);
          this.vaccines = response;
        }
        );
      }
}

export interface VaccinationSubmissions {
  vaccineId: any | null;
  healthProviderId: string | null;
  patientId: string | null;
  vaccinationDate: string;
  isVaccinated: boolean;
  status: string | null;
  vaccineName: string;
}
