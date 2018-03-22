import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  winWidth:number = 0;
  classType:boolean = false;

  appHandler(e){
     this.winWidth = window.outerWidth;
     if(this.winWidth < 576){
        this.classType = true;
     }else{
        this.classType = false;
     }
  }
  getClasses() {
     let classes = {
       container: !this.classType,
       containerFluid: this.classType
     };
     return classes;
   }

}
