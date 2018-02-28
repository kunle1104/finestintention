import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {GalleryComponent} from './gallery/gallery.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {AdvertComponent} from './advert/advert.component';
import {JoinInComponent} from './join-in/join-in.component';
import {MarketComponent} from './market/market.component';
import {PicturesComponent} from './gallery/pictures/pictures.component';
import {AlbumsComponent} from './gallery/albums/albums.component';
import {VideosComponent} from './gallery/videos/videos.component';
import {AboutUsComponent} from './about-us/about-us.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {PrivacyComponent} from './privacy/privacy.component';
import {TermsComponent} from './terms/terms.component';

const appRoutes: Routes = [

  {path: '', redirectTo: 'gallery/pictures', pathMatch: 'full'},
  {path: 'gallery', component: GalleryComponent, children: [
      { path: 'pictures', component: PicturesComponent },
      { path: 'albums', component: AlbumsComponent },
      { path: 'videos', component: VideosComponent },
    ]
  },
  {path: 'advert', component: AdvertComponent},
  {path: 'join-in', component: JoinInComponent},
  {path: 'market', component: MarketComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'contact-us', component: ContactUsComponent},
  {path: 'privacy', component: PrivacyComponent},
  {path: 'terms', component: TermsComponent},
  { path: 'not-found', component: PageNotFoundComponent, data: {message: 'Page not found!'} },
  { path: '**', redirectTo: '/not-found' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
