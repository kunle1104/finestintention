import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('stickyAnchor') stickyAnchor: ElementRef;
  @ViewChild('sticky') sticky: ElementRef;
  addStickyClass:boolean = false;
  isReady: boolean = true;
  constructor() { }

  ngOnInit() {
  }
  //minWidth:number = 767;

  myScrollHandler(){

    let window_top:number = window.pageYOffset ;
    let div_top = this.sticky.nativeElement.offsetTop;

    if (window_top > div_top) {
        this.addStickyClass = true;
        //'#sticky-anchor').height($('#sticky').outerHeight()
        //this.stickyAnchor.nativeElement.height = this.sticky.nativeElement.outerHeight;
    } else {
        this.addStickyClass = false;
        //this.stickyAnchor.nativeElement.height = 0;
    }
  }
}
