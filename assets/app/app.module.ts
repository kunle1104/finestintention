import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AdvertComponent } from './advert/advert.component';
import { JoinInComponent } from './join-in/join-in.component';
import { MarketComponent } from './market/market.component';
import { SubMenuComponent } from './sub-menu/sub-menu.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { MyListComponent } from './my-list/my-list.component';
import { MyItemComponent } from './my-item/my-item.component';
import { PicturesComponent } from './gallery/pictures/pictures.component';
import { VideosComponent } from './gallery/videos/videos.component';
import { VideoSearchComponent } from './gallery/videos/video-search/video-search.component';
import { VideoDisplayComponent } from './gallery/videos/video-display/video-display.component';
import { AlbumsComponent } from './gallery/albums/albums.component';
import { AlbumSearchComponent } from './gallery/albums/album-search/album-search.component';
import { AlbumDisplayComponent } from './gallery/albums/album-display/album-display.component';
import { PictureSearchComponent } from './gallery/pictures/picture-search/picture-search.component';
import { PicsDisplayComponent } from './gallery/pictures/pics-display/pics-display.component';

import {GalleryService} from './gallery/gallery.service';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import 'hammerjs';

Hammer.defaults.touchAction = 'pan-y';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    GalleryComponent,
    AdvertComponent,
    JoinInComponent,
    MarketComponent,
    SubMenuComponent,
    SideBarComponent,
    MyListComponent,
    MyItemComponent,
    PicturesComponent,
    PicsDisplayComponent,
    PictureSearchComponent,
    VideosComponent,
    VideoDisplayComponent,
    VideoSearchComponent,
    AlbumsComponent,
    AlbumDisplayComponent,
    AlbumSearchComponent,
    AboutUsComponent,
    ContactUsComponent,
    PrivacyComponent,
    TermsComponent

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [GalleryService],
  bootstrap: [AppComponent]
})

export class AppModule {

}
