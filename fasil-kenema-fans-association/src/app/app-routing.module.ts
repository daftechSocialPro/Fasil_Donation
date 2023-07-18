import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AssociationComponent } from './pages/association/association/association.component';
import { DonationComponent } from './pages/donation/donation/donation.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ShopComponent } from './pages/shop/shop/shop.component';
import { MembershipPageComponent } from './pages/membership/membership-page/membership-page.component';
import { DonationDetailComponent } from './pages/donation/donation-detail/donation-detail.component';
import { TicketComponent } from './pages/ticket/ticket.component';

const routes: Routes = [


  { path: '', component: HomeComponent },
  { path: 'association', component: AssociationComponent },
  { path: 'donation', component: DonationComponent },
  { path: 'donation/:id', component: DonationDetailComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'membership', component: MembershipPageComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'ticket', component: TicketComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
