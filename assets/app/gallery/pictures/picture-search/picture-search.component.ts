import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {GalleryService} from '../../gallery.service';

@Component({
  selector: 'app-picture-search',
  templateUrl: './picture-search.component.html',
  styleUrls: ['./picture-search.component.css']
})

export class PictureSearchComponent implements OnInit {

  searchForm: FormGroup;

  constructor(public formBuilder:FormBuilder, private galleryService:GalleryService) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
        style : ['Any'],
        function:['Any'],
        imageType:['Individual'],
        source:['Web']
        //timeAdded: ['Any']
    });
  }
  convertValues(submitted):{style:string, function:number, imageType: number, source: number }{
    let searchValue:{};//{style: "", function:};
     switch(submitted.function) {
       case "Wedding":
          //code block
          submitted.function = 1;
          break;
       case "Naming":
          //code block
          submitted.function = 2;
          break;
       case "Birthday":
          //code block
          submitted.function = 3;
          break;
       case "Burial":
          //code block
          submitted.function = 4;
          break;
       case "Others":
          //code block
          submitted.function = 5;
          break;
       default:
          //code block
          submitted.function = 0;
     }
     switch(submitted.imageType) {
       case "Individual":
          //code block
          submitted.imageType = 1;
          break;
       case "Group":
          //code block
          submitted.imageType = 2;
          break;
       case "Family":
          //code block
          submitted.imageType= 3;
          break;
       case "Multi Embedded":
          //code block
          submitted.imageType = 4;
          break;
       default:
          //code block
          submitted.imageType = 0;
     }
     switch(submitted.source) {
       case "Web":
          //code block
          submitted.source = 1;
          break;
       case "Users":
          //code block
          submitted.source = 2;
          break;
       case "Captured":
          //code block
          submitted.source = 3;
          break;
       case "Events":
          //code block
          submitted.source = 4;
          break;
       default:
          //code block
          submitted.source = 0;
     }
     switch(submitted.style) {
       case "Atire":
          //code block
          submitted.style = "1";
          break;
       case "Casuals":
          //code block
          submitted.style = "2";
          break;
       case "Beads":
          //code block
          submitted.style = "3";
          break;
       case "Head Tie":
          //code block
          submitted.style = "4";
          break;
       case "Make Overs":
          //code block
          submitted.style = "5";
          break;
       default:
          //code block
          submitted.style = "0";
     }
     return {style:submitted.style,function: submitted.function, imageType:submitted.imageType,
             source:submitted.source };
  }
  onSubmit(formValue){
     //console.log(formValue);
     //console.log(this.searchForm.value)
     let submit = (<any>Object).assign({}, formValue );
     let value = this.convertValues(submit);
     //this.galleryService.newPictureSearch(formValue);
     //console.log(value);
     this.galleryService.sendDisplayMessage((<any>Object).assign({}, value ));

  }


}
