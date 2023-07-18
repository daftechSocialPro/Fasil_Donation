import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../home.service';
import { CommonService } from 'src/app/common/common.service';

@Component({
  selector: 'app-home-about',
  templateUrl: './home-about.component.html',
  styleUrls: ['./home-about.component.css']
})
export class HomeAboutComponent implements OnInit {

  aboutSections:any;
  constructor(private homeService:HomeService,private commonService : CommonService){}

  ngOnInit(): void {
    
    this.homeService.getAboutSections().subscribe({
      next:(res)=>{

        this.aboutSections = res && res[0]

      },error:(err)=>{

      }
    })
  }


  getImage(url:string){

    return this.commonService.createImgPath(url)
  }

}
