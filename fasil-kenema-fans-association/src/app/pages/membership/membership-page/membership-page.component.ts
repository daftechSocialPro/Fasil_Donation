import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common/common.service';
import { HomeService } from '../../home/home.service';

@Component({
  selector: 'app-membership-page',
  templateUrl: './membership-page.component.html',
  styleUrls: ['./membership-page.component.css']
})
export class MembershipPageComponent implements OnInit {

  memeberships: any
  constructor(private homeService: HomeService, private commonService: CommonService) { }


  ngOnInit(): void {

    this.getMemberShip()
  }

  getMemberShip() {

    this.homeService.getmembership().subscribe({
      next: (res) => {
  
        this.memeberships = res
      }, error: (err) => {

      }
    })
  }

  getImage(url: string) {
    return this.commonService.createImgPath(url)
  }

}