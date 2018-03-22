import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  subMenuList : string[] = ['pictures', 'albums', 'videos' ];
    constructor(){}

  ngOnInit() {

  }

}
