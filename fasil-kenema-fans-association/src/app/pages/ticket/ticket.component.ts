import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home/home.service';
import { CommonService } from 'src/app/common/common.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  nextMatch: any
  constructor(private homeService: HomeService, private commonService: CommonService) {

  }
  ngOnInit(): void {
    this.getNextMatch()
  }

  getNextMatch() {
    this.homeService.getNextMatches().subscribe({
      next: (res) => {
        this.nextMatch = res && res[0]
      }
    })
  }
  getImage(url: any) {
    var b = this.commonService.createImgPath(url)
    return b;
  }
  getTime(date:any){

    return new Date(date).toLocaleTimeString()
   }
  getLogo(){

    let image;
    if (this.nextMatch && this.nextMatch.isAway) {
      image = this.getImage(this.nextMatch.awayLogo);
    }else {
      image = "../../assets/images/logo.png"; // Set a default image here
    }

    return image
  }
  getLogo2(){

    let image;
    if (this.nextMatch && this.nextMatch.isAway) {
      image = "../../assets/images/logo.png";
    }else if(this.nextMatch) {
      image = this.getImage(this.nextMatch.awayLogo); // Set a default image here
    }
    else {
      image = "../../../assets/images/logo2.jpg";
    }

    return image
  }

}
