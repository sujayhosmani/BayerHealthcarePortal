import { Component, OnInit } from '@angular/core';
import { VaccinationMaster } from '../models/vaccines-masters';
import { CoreNetworkService } from '../shared/services/core.network.service';
import { vaccinePost } from '../helpers/constants/constants';

@Component({
  selector: 'app-vaccine-masters',
  templateUrl: './vaccine-masters.component.html',
  styleUrl: './vaccine-masters.component.scss'
})
export class VaccineMastersComponent  implements OnInit {
    vaccines: VaccinationMaster[] = [];
    roleInput: string = '';
    constructor(private network: CoreNetworkService) {

    }
  ngOnInit(): void {
    this.getAll();
  }

    onRoleAdd(){
      let vaccinationMaster = new VaccinationMaster();
      vaccinationMaster.vaccineName = this.roleInput;
      this.network.insert(vaccinationMaster, vaccinePost).subscribe((response: any) => {
        console.log(response);
        this.vaccines.push(response);
      }
      );
    }

    getAll(){
      this.network.getAll(vaccinePost).subscribe((response: any) => {
        console.log(response);
        this.vaccines = response;
      }
      );
    }
}
