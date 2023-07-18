import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../home/home.service';
import { CommonService } from 'src/app/common/common.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-donation-detail',
  templateUrl: './donation-detail.component.html',
  styleUrls: ['./donation-detail.component.css']
})
export class DonationDetailComponent implements OnInit {

  donation: any
  donations:any
  constructor(private homeService :HomeService, private commonService : CommonService,private route : ActivatedRoute){}

  ngOnInit(): void {
    this.getDonation()
    this.getDonations()
  }

  getDonation (){

    const id = this.route.snapshot.paramMap.get('id');
    this.homeService.getSingleDonation(id).subscribe({
      next:(res)=>{
        this.donation = res 
      },error:(err)=>{
      }
    })
  }

  
  getDonations (){
    this.homeService.getDonations().subscribe({
      next:(res)=>{
        this.donations = res 
      },error:(err)=>{
      }
    })
  }

  setDonation(don:any){
    this.donation = don
  }

  getImage(url:string){
    return this.commonService.createImgPath(url)    
  }

}
