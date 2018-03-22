import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
//import { GalleryModule } from './gallery/gallery.module';
import { SharedModule } from './shared-module/shared.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { JoinInComponent } from './join-in/join-in.component';
import { MarketComponent } from './market/market.component';
import { AdvertComponent } from './advert/advert.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { HomeComponent } from './home/home.component';

import { TermsComponent } from './terms/terms.component';
import 'hammerjs';

Hammer.defaults.touchAction = 'pan-y';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageNotFoundComponent,
    FooterComponent,
    AboutComponent,
    JoinInComponent,
    MarketComponent,
    AdvertComponent,
    AboutUsComponent,
    ContactUsComponent,
    PrivacyComponent,
    TermsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    //GalleryModule,
    AppRoutingModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
