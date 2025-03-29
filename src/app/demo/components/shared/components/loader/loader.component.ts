import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  isLoading: boolean = false;
  baseZIndex = 112000;

  constructor(private loaderService: LoaderService) {
      this.isLoading = false;
  }

  ngOnInit(): void {
    this.loaderService.isLoading.subscribe(newValue => this.isLoading = newValue);
  }

}
