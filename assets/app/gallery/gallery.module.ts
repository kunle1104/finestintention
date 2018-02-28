import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared-module/shared.module';

import { GalleryComponent } from './gallery.component';
import { PicturesComponent } from './pictures/pictures.component';
import { VideosComponent } from './videos/videos.component';
import { VideoSearchComponent } from './videos/video-search/video-search.component';
import { VideoDisplayComponent } from './videos/video-display/video-display.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumSearchComponent } from './albums/album-search/album-search.component';
import { AlbumDisplayComponent } from './albums/album-display/album-display.component';
import { PictureSearchComponent } from './pictures/picture-search/picture-search.component';
import { PicsDisplayComponent } from './pictures/pics-display/pics-display.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import {GalleryService} from './gallery.service';

@NgModule({
  declarations:[
    GalleryComponent,
    PicturesComponent,
    PicsDisplayComponent,
    PictureSearchComponent,
    VideosComponent,
    VideoDisplayComponent,
    VideoSearchComponent,
    AlbumsComponent,
    AlbumDisplayComponent,
    AlbumSearchComponent,
    SideBarComponent
  ],
  imports:[
    HttpModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ],
  providers: [GalleryService]
})
export class GalleryModule {

}
