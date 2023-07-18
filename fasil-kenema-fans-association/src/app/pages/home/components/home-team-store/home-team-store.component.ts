import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home-team-store',
  templateUrl: './home-team-store.component.html',
  styleUrls: ['./home-team-store.component.css']
})
export class HomeTeamStoreComponent {



  customOptions: OwlOptions = {
    autoplay: true,
    nav: false,
    margin: 30,
    dots: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      768: {
        items: 2
      },
      1000: {
        items: 4
      }
    }
  }

}

