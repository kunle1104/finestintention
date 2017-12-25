import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {GalleryService} from '../../gallery.service';

@Component({
  selector: 'app-album-search',
  templateUrl: './album-search.component.html',
  styleUrls: ['./album-search.component.css']
})

export class AlbumSearchComponent implements OnInit {

  albumForm: FormGroup;

  constructor(public formBuilder:FormBuilder, private galleryService:GalleryService) { }

  ngOnInit() {
    this.albumForm = this.formBuilder.group({
        function:['Any'],
        place:['Any'],
        month:['']

    });
  }
  convertValues(submitted):{function:number, place: string, month: string }{
    //let searchValue:{};//{style: "", function:};
    //console.log(submitted);
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

     return {function: submitted.function, place:submitted.place, month:submitted.month};

  }
  onSubmit(formValue){
     //console.log(formValue);
    // console.log(this.search.value)
     let submit = (<any>Object).assign({}, formValue );
     let value = this.convertValues(submit);
     //this.galleryService.newPictureSearch(formValue);
     //console.log(value);
     this.galleryService.sendAlbumDisplayMessage((<any>Object).assign({}, value));

  }


}
