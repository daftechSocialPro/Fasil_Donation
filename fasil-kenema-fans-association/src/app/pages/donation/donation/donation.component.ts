import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common/common.service';
import { HomeService } from '../../home/home.service';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css']
})
export class DonationComponent implements OnInit {
  donations: any;
  constructor(private commonService: CommonService, private homeService: HomeService) { }

  ngOnInit(): void {

    this.getDonation()
  }

  getDonation() {
    this.homeService.getDonations().subscribe({
      next: (res) => {
   
        this.donations = res

      }, error: (err) => {

      }
    })

  }
  getImage(url: string) {

    return this.commonService.createImgPath(url)

  }

}
