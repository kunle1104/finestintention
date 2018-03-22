import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {AdvertComponent} from './advert/advert.component';
import {JoinInComponent} from './join-in/join-in.component';
import {MarketComponent} from './market/market.component';
import {AboutUsComponent} from './about-us/about-us.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {PrivacyComponent} from './privacy/privacy.component';
import {TermsComponent} from './terms/terms.component';
import {HomeComponent} from './home/home.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},

  { path: 'advert', component: AdvertComponent},
  { path: 'join-in', component: JoinInComponent},
  { path: 'market', component: MarketComponent},
  { path: 'about-us', component: AboutUsComponent},
  { path: 'contact-us', component: ContactUsComponent},
  { path: 'privacy', component: PrivacyComponent},
  { path: 'terms', component: TermsComponent},
  { path: ':gallery', loadChildren: './gallery/gallery.module#GalleryModule' },
  { path: 'not-found', component: PageNotFoundComponent, data: {message: 'Page not found!'} },
  { path: '**', redirectTo: '/not-found' }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
