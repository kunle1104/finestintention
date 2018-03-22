import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {GalleryComponent} from './gallery.component';
import {PicturesComponent} from './pictures/pictures.component';
import {AlbumsComponent} from './albums/albums.component';
import {VideosComponent} from './videos/videos.component';

const galleryRoutes: Routes = [
  {path: '', component: GalleryComponent, children: [
      { path: '', redirectTo: 'pictures',pathMatch: 'full' },
      { path: 'pictures', component: PicturesComponent },
      { path: 'albums', component: AlbumsComponent },
      { path: 'videos', component: VideosComponent }
    ]}
];
@NgModule({
  imports: [
    RouterModule.forChild(galleryRoutes)
  ],
  exports: [RouterModule]
})
export class GalleryRoutingModule {}
