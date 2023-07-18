import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../home.service';
import { CommonService } from 'src/app/common/common.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoWidth: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  partners : any 
  constructor(private homeService : HomeService,private commonService : CommonService){}

  ngOnInit(): void {
    
    this.homeService.getPartners().subscribe({
      next:(res)=>{

        this.partners = res

      },error:(err)=>{

      }

    })
    
  }

  getImage(url:string){

    return this.commonService.createImgPath(url)
  }

}
