import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router'
import { SubMenuComponent } from './sub-menu/sub-menu.component';
//import { SideBarComponent } from '../side-bar/side-bar.component';

@NgModule({
  declarations:[
    SubMenuComponent
  ],
  imports:[
     CommonModule,
     RouterModule
  ],
  exports:[
    SubMenuComponent
  ]
})
export class SharedModule {

}
