import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  galleryMenu : string[] = ['pictures', 'albums', 'videos' ];
  constructor(private router: Router, private route:ActivatedRoute) { }

  ngOnInit() {
    
  }

}
