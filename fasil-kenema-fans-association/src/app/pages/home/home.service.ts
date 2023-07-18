import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  BaseURI: string =   environment.baseUrl 

  getHomeHeroes() {
      return this.http.get<any>(this.BaseURI+"/homehero")
  }

  getNextMatches(){
    return this.http.get<any>(this.BaseURI+"/NextMatch")
  }

  getAboutSections (){

    return this.http.get<any>(this.BaseURI+"/AboutSection")
  }

  getPartners (){

    return this.http.get<any>(this.BaseURI+"/Partners")
  }

  getmembership (){

    return this.http.get<any>(this.BaseURI+"/DesignSetting/getTemplateClient")
  }

  getDonations (){

    return this.http.get<any>(this.BaseURI+"/Donation")
  }
  getSingleDonation(donationId:any){

    return this.http.get<any>(this.BaseURI+"/Donation/single?donationId="+donationId)
  }


}
