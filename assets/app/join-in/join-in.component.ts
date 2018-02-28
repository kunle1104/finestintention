import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-join-in',
  templateUrl: './join-in.component.html',
  styleUrls: ['./join-in.component.css']
})
export class JoinInComponent implements OnInit {
  joinInMenu : string[] = [];
  constructor() { }

  ngOnInit() {
  }

}
