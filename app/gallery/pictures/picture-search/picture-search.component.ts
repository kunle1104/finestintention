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
    });
  }
  convertValues(submitted):{style:string, function:number, imageType: number, source: number }{
    let searchValue:{};//{style: "", function:};
     switch(submitted.function) {
       case "Wedding":
          submitted.function = 1;
          break;
       case "Naming":
          submitted.function = 2;
          break;
       case "Birthday":
          submitted.function = 3;
          break;
       case "Burial":
          submitted.function = 4;
          break;
       case "Others":
          submitted.function = 5;
          break;
       default:
          submitted.function = 0;
     }
     switch(submitted.imageType) {
       case "Individual":
          submitted.imageType = 1;
          break;
       case "Group":
          submitted.imageType = 2;
          break;
       case "Family":
          submitted.imageType= 3;
          break;
       case "Multi Embedded":
          submitted.imageType = 4;
          break;
       default:
          submitted.imageType = 0;
     }
     switch(submitted.source) {
       case "Web":
          submitted.source = 1;
          break;
       case "Users":
          submitted.source = 2;
          break;
       case "Captured":
          submitted.source = 3;
          break;
       case "Events":
          submitted.source = 4;
          break;
       default:
          submitted.source = 0;
     }
     switch(submitted.style) {
       case "Atire":
          submitted.style = "1";
          break;
       case "Casuals":
          submitted.style = "2";
          break;
       case "Beads":
          submitted.style = "3";
          break;
       case "Head Tie":
          submitted.style = "4";
          break;
       case "Make Overs":
          submitted.style = "5";
          break;
       default:
          submitted.style = "0";
     }
     return {style:submitted.style,function: submitted.function, imageType:submitted.imageType,
             source:submitted.source };
  }
  onSubmit(form: FormGroup){
     let submit = (Object).assign({}, form.value );
     let value:{} = this.convertValues(submit);
     this.galleryService.sendDisplayMessage((Object).assign({}, value ));

  }
}
