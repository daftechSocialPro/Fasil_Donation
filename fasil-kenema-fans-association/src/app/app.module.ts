import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HeaderComponent } from './layouts/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { HeroComponent } from './pages/home/components/home-hero/hero.component';
import { MembershipComponent } from './pages/home/components/home-membership/membership.component';
import { HomeAboutComponent } from './pages/home/components/home-about/home-about.component';
import { PartnerComponent } from './pages/home/components/partner/partner.component';
import { HomeDonationComponent } from './pages/home/components/home-donation/home-donation.component';
import { HomeTeamStoreComponent } from './pages/home/components/home-team-store/home-team-store.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthHeaderIneterceptor } from './components/http-interceptors/auth-header-interceptor';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AssociationComponent } from './pages/association/association/association.component';
import { DonationComponent } from './pages/donation/donation/donation.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ShopComponent } from './pages/shop/shop/shop.component';
import { MembershipPageComponent } from './pages/membership/membership-page/membership-page.component';
import { DonationDetailComponent } from './pages/donation/donation-detail/donation-detail.component';
import { TicketComponent } from './pages/ticket/ticket.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    HeroComponent,
    MembershipComponent,
    HomeAboutComponent,
    PartnerComponent,
    HomeDonationComponent,
    HomeTeamStoreComponent,
    SpinnerComponent,
    AssociationComponent,
    DonationComponent,
    ContactComponent,
    ShopComponent,
    MembershipPageComponent,
    DonationDetailComponent,
    TicketComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CarouselModule
  ],
  providers: [    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHeaderIneterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
