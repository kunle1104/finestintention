import { Component, OnInit, Input } from '@angular/core';
import {PictureSearchComponent} from '../gallery/pictures/picture-search/picture-search.component';
import { Subscription } from 'rxjs/Subscription';
import {GalleryService} from '../gallery/gallery.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  @Input() selectedComponent:string;
  hideShow:boolean = true;
  subscription: Subscription;
  minWidth:number = 768;
  constructor(private galleryService: GalleryService) { }

  ngOnInit() {
    this.myWindowHandler();
    this.subscription = this.galleryService.getDisplayMessage()
    .subscribe(message => {
         this.myWindowHandler();
    });
  }
  myWindowHandler(){
     if (window.innerWidth < this.minWidth){
        this.hideShow = true;
        this.getDisplay();
    }else{
      this.hideShow = false;
      this.getDisplay();
    }

}
  getBg(){
    if(!this.hideShow){
       return 'url(../../assets/images/close.png)' ;
    }
  }
  getDisplay(){
     if(this.hideShow){
        return 'none' ;
     }

  }
  onClickOpen(){
    this.hideShow =!this.hideShow;

  }

}
