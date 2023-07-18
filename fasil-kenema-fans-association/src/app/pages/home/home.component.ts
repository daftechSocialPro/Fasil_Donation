import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    autoplay:true,
      margin:15,
      nav: false,
      dots:false,
      responsive: {
          0: {
              items: 2
          },
          600: {
              items:2
          },
          1000: {
              items:2
          }
      }
  }
  donations: any 
  constructor(private homeService : HomeService){}

  ngOnInit(): void {
    this.getDonations()
  }
  getDonations(){

    this.homeService.getDonations().subscribe({
      next:(res)=>{
        this.donations = res 
      },error:(err)=>{

      }
    })
  }
}
