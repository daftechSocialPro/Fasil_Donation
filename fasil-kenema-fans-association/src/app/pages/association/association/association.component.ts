import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HomeService } from '../../home/home.service';

@Component({
  selector: 'app-association',
  templateUrl: './association.component.html',
  styleUrls: ['./association.component.css']
})
export class AssociationComponent implements OnInit {


  constructor(private homeService: HomeService) {

  }
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    margin: 50,
    nav: false,
    dots: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 6
      }
    }
  }
  aboutSections: any
  ngOnInit(): void {
    this.getAboutSection()
  }
  getAboutSection() {

    this.homeService.getAboutSections().subscribe({
      next: (res) => {
        this.aboutSections = res != null ? res[0] : []
      }, error: (err) => {

      }
    })
  }
}
