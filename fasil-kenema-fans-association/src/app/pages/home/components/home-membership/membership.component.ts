import { Component, Input, OnInit } from '@angular/core';
import { HomeService } from '../../home.service';
import { CommonService } from 'src/app/common/common.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})


export class MembershipComponent implements OnInit {
@Input() more : boolean= false
customOptions: OwlOptions = {
  loop: true,
  margin:20,
  autoplay:true,
  mouseDrag: true,
  touchDrag: true,
  autoWidth: true,
  pullDrag: false,
  dots: false,
  navSpeed: 2,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 1
    },
    740: {
      items: 2
    },
    940: {
      items: 2
    }
  },
  nav: true
}
  memeberships: any 
  memeberships2: any
  constructor(private homeService: HomeService, private commonService: CommonService) { }


  ngOnInit(): void {

    this.getMemberShip()
  }

  getMemberShip() {

    this.homeService.getmembership().subscribe({
      next: (res) => {
  
        if (this.more){
        this.memeberships = res.slice(0,2)
        
        }
        else {
          this.memeberships = res 
        }
        this.memeberships2 =res
      }, error: (err) => {

      }
    })
  }

  getImage(url: string) {
    return this.commonService.createImgPath(url)
  }

}
