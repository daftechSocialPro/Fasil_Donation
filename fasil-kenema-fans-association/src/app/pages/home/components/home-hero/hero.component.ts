import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../home.service';
import { CommonService } from 'src/app/common/common.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  nextMatch:any

  hero1:any
  hero2:any
  hero3:any

  constructor(private homeService:HomeService,private commonService :CommonService){

  }


  ngOnInit(): void {
  this.getHomeHeroes()
  this.getNextMatch()
  }

  getHomeHeroes(){
    this.homeService.getHomeHeroes().subscribe({next:(res)=>{
    
      
   this.hero1 =  res && res[0]
   this.hero2 =res && res[1]
   this.hero3 =res && res[2]

    
    },error:(err)=>{}
    
    
    
    })
  }

  getNextMatch(){
    this.homeService.getNextMatches().subscribe({next:(res)=>{

    this.nextMatch = res && res[0]
    }})
  }

  getImage(url: any) {
    var b = this.commonService.createImgPath(url)
    return b;
  }

  getLogo(){

    let image;
    if (this.nextMatch && this.nextMatch.isAway) {
      image = this.getImage(this.nextMatch.awayLogo);
    }else {
      image = "../../../assets/images/logo2.jpg"; // Set a default image here
    }

    return image
  }
  getLogo2(){

    let image;
    if (this.nextMatch && this.nextMatch.isAway) {
      image = "../../../assets/images/logo.png";
    }else if(this.nextMatch) {
      image = this.getImage(this.nextMatch.awayLogo); // Set a default image here
    }
    else {
      image = "../../../assets/images/logo.png";
    }

    return image
  }
  getTime(date:any){

   return new Date(date).toLocaleTimeString()
  }

  getDate(date:any){

    return new Date(date).toLocaleDateString()
   }
  
}
