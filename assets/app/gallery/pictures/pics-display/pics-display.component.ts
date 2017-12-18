import { Component, OnInit, ViewChild ,ElementRef, Renderer2} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
//import {Pics} from '../pics';
import { Picture } from '../picture.model';
import {GalleryService} from '../../gallery.service';

@Component({
  selector: 'app-pics-display',
  templateUrl: './pics-display.component.html',
  styleUrls: ['./pics-display.component.css']
})
export class PicsDisplayComponent implements OnInit {
  @ViewChild('list') list: ElementRef;

  back:number = 0;
  next:number = 0;
  myLikes:number = 0;
  likes:string = '0';
  liked:boolean = false;
  source:string = '';
  timerId: any;
  playPauseImage:string ="play.png";
  likeImage:string = "like1.png";

  allPics : Picture[] = [];
  allPictures : Picture[] =[];
  //all:Pics[] = [];
  picsList : Picture[] = [];
  selectedPics:Picture = {
    "id": 20,
    "path": "img20.jpg",
    "primaryColor": "red",
    "secondaryColor": "white",
    "style": "345",
    "imageType": 1,
    "source": 1,
    "fiFunction":5,
    "description": "N/A",
    "likes":20,
    "uploadedDate": new Date()
  };
  //tempPics : Pics[] = [ ];
  likesArr:any[] = [];

  errMessage : string = 'Loding Pictures';

  displayMessage: any;
  subscription: Subscription;

  constructor(private galleryService: GalleryService, private renderer: Renderer2) { }

  ngOnInit() {

     this.getAllPics();
     this.getDisplayMessage();


  }
  ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        for(let pict of this.allPics){
           if(this.likesArr[pict.id] !== false){
              //++pict.likes;
              this.galleryService.updatePicture(pict)
                 .subscribe(
                     result => console.log(result)
                 );
           }
        }

        this.subscription.unsubscribe();

  }
  /*getMyPics(){
    this.galleryService.getAllPictures()
      .subscribe(
          pics => {
             this.all = pics;
          },
          error => {
             console.log('error fetching pictures ******');
             this.errMessage ='Error Fetching Pictures, Please Search Again';
          }
       );
  }*/

  getAllPics(){
    this.galleryService.getPictures()
      .subscribe(
          pics => {
            //let tempPics : Pics[];
             this.allPics = pics;
             for(let pict of this.allPics){
                this.likesArr[pict.id] = false;
             }
             this.setList({style:"0", function:0, imageType: 1, source: 1});
             //this.setPicsList(this.allPics);

          },
          error => {
             console.log('error fetching pictures');
             this.errMessage ='Error Fetching Pictures, Please Search Again';
          }
       );
  }
  getDisplayMessage(){
    this.subscription = this.galleryService.getDisplayMessage()
    .subscribe(message => {
         //this.message = message;
         this.setList(message);
    });
  }
  setList(value){
     //let myPics : Pics[] = [ ];
     let myPics1 : Picture[] = [ ];
     let myPics2 : Picture[] = [ ];
     let myPics3 : Picture[] = [ ];
     let myPics4 : Picture[] = [ ];

     if(value.style === "0" && value.function === 0 && value.imageType === 0 && value.source === 0){
        myPics1 = this.allPics.slice();
        this.setPicsList(myPics1.slice());
       }
     else{
        if(value.style !== "0"){
           //let n = value.style.indexOf(pic.style);
           let str:string ;
           let test:string = "" + value.style;
           //console.log(value.style);
           test = value.style;
           //console.log(test);
           for(let pic of this.allPics){
              //if(pic.style === value.style){
              str = " " + pic.style;


               //console.log(pic.style);
               //console.log(pic.function);
                if(str.indexOf(test) !== -1){
                   myPics1.push(pic);
              }
           }
         }else {
            myPics1 = this.allPics.slice();
        }
        if(value.function !== 0){
           for(let pic of myPics1){
              if(pic.fiFunction === value.function){
                 myPics2.push(pic);
              }
           }
         }else {
           myPics2 = myPics1.slice();
         }
         if(value.imageType !== 0){
            for(let pic of myPics2){
               if(pic.imageType === value.imageType){
                  myPics3.push(pic);
               }
            }
          }else {
            myPics3 = myPics2.slice();
          }
          if(value.source !== 0){
             for(let pic of myPics3){
                if(pic.source === value.source){
                   myPics4.push(pic);
                }
              }
           }else {
             myPics4 = myPics3.slice();
           }
           this.setPicsList(myPics4.slice());
       }
  }
  setPicsList(list:Picture[]) {
     this.myLikes = 0;
     this.back = 0;
     this.next = 0;
     if(list.length === 0 ){
         this.picsList.length = 0;
         this.selectedPics = {
           "id": 20,
           "path": "img20.jpg",
           "primaryColor": "red",
           "secondaryColor": "white",
           "style": "345",
           "imageType": 1,
           "source": 1,
           "fiFunction":5,
           "description": "N/A",
           "likes":20,
           "uploadedDate": new Date()
         };
         this.myLikes = this.selectedPics.likes;
         this.likes =  ' ' + this.myLikes;

         this.setPicsSource(this.selectedPics);
         this.errMessage = "There are no matches, Please try other search options";
     }else{
        this.picsList = list;
        this.selectedPics = this.picsList[0];
        this.myLikes = this.selectedPics.likes;
        this.likes =  ' ' + this.myLikes;
        this.next = this.picsList.length-1;
        this.setPicsSource(this.selectedPics);
   }
  }
  setSelectedPics(pic){
    let index:number;
     this.selectedPics = pic;
     //console.log(pic)
     this.myLikes = this.selectedPics.likes;
     this.likes =  ' ' + this.myLikes;

     index = this.picsList.indexOf(this.selectedPics);
     this.next = (this.picsList.length-1) - index;
     this.back = index;
     if(this.likesArr[this.selectedPics.id]){
        this.likeImage = "like2.png";
     }else{
        this.likeImage = "like1.png";
     }

     this.setPicsSource(this.selectedPics);
  }
  setPicsSource(pics){
    if(pics.source === 1){
      this.source = 'Web';
    }
    if(pics.source === 2){
      this.source = 'Users';
    }
    if(pics.source === 3){
      this.source = 'Captured by us';
    }
    if(pics.source === 4){
      this.source = 'Events';
    }
  }
  onLike(pics){
    let index:number;
    index = this.picsList.indexOf(this.selectedPics);
    if(this.likesArr[pics.id] === false){
       this.likeImage = "like2.png";
       //index = this.picsList.indexOf(this.selectedPics);
       ++this.picsList[index].likes;
       this.likes =  ' ' + this.selectedPics.likes ;
       this.likesArr[pics.id] = true;
    }else{
       this.likeImage = "like1.png";
       //index = this.picsList.indexOf(this.selectedPics);
       --this.picsList[index].likes;
       this.likes =  ' ' + this.selectedPics.likes;
       this.likesArr[pics.id] = false;
    }

  }
  onBack(){
    let index:number;
    if(this.back > 0 && this.back <= this.picsList.length-1){
      ++this.next;
      --this.back;
      index = this.picsList.indexOf(this.selectedPics);
      this.selectedPics = this.picsList[--index];
    }else{
      this.next = 0;
      this.back = this.picsList.length-1;
      this.selectedPics = this.picsList[this.picsList.length-1];
    }
    if(this.likesArr[this.selectedPics.id]){
       this.likeImage = "like2.png";
    }else{
       this.likeImage = "like1.png";
    }
    this.likes =  ' ' + this.selectedPics.likes ;
  }
  onNext(){
    let index:number;
    if(this.next <= this.picsList.length-1 && this.next > 0){
      --this.next;
      ++this.back;
      index = this.picsList.indexOf(this.selectedPics);
      this.selectedPics = this.picsList[++index];
    }else{
      this.next = this.picsList.length-1;
      this.back = 0;
      this.selectedPics = this.picsList[0];
    }
    if(this.likesArr[this.selectedPics.id]){
       this.likeImage = "like2.png";
    }else{
       this.likeImage = "like1.png";
    }
    this.likes =  ' ' + this.selectedPics.likes ;
  }
  slidePlay(){
     if(this.playPauseImage ==="play.png"){
          this.playPauseImage = "pause.png"
          this.timerId = setInterval(()=> {
          this.onNext(); }, 1000)
      }else{
          this.playPauseImage = "play.png"
          clearInterval(this.timerId)
       }
  }
  scroller(event){
      //let scr :number = this.list.nativeElement.scrollLeft;
      //console.log(scr);
      //console.log('You scrolled');
      //this.renderer.setValue(this.list.nativeElement.scrollTo, '250,0');
      //this.list.nativeElement.scrollTo(250,0);
  }

}
