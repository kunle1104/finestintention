import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isIn = false;

  constructor() { }

  ngOnInit() {

  }



  toggleState() { // click handler
        let bool = this.isIn;
        this.isIn = bool === false ? true : false;
  }
}
