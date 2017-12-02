import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
//import {Album} from '../album';
import {Album1} from '../album.model';
import {GalleryService} from '../../gallery.service';

@Component({
  selector: 'app-album-display',
  templateUrl: './album-display.component.html',
  styleUrls: ['./album-display.component.css']
})
export class AlbumDisplayComponent implements OnInit {
  nextPicture:number = 0;
  backPicture:number = 0;

  backAlbum:number = 0;
  nextAlbum:number = 0;

  myLikesPicture:number;
  likesPicture:string;

  myLikesAlbum:number;
  likesAlbum:string;

  source:string;
  liked:boolean = false;

  timerId: any;
  playPauseImage:string ="play.png";
  likeImage:string = "like1.png";

  allAlbums : Album1[] = [];
  albumList: Album1[] = [];
  selectedAlbum: Album1 = {
    "id": 1,
    "name": "album1",
    "length": 42,
    "fiFunction": 1,
    "month": "September 2017",
    "place": "London - United Kingdom",
    "description": "A View Pics Wedding",
    "likes": 0,
    "source": 1,
    "uploadedDate": new Date()
  };

  selectedPicsCounter:number = 1;
  selectedPicsPath:string = 'img' + this.selectedPicsCounter + '.jpg';

  likesArr:any[] = [];

  errMessage : string = 'Loding Albums';

  displayMessage: any;
  subscription: Subscription;

  baseUrl: string = 'http://localhost:4568';

  headers = new Headers({'Content-Type': 'application/json'});

  constructor(private galleryService: GalleryService) { }

  ngOnInit() {
     this.getAlbums();
     this.getAlbumDisplayMessage();
  }
  ngOnDestroy() {
    for(let album of this.allAlbums){
       if(this.likesArr[album.id] !== false){
          //++album.likes;
          this.galleryService.updateAlbum(album)
             .subscribe(
                 result => console.log(result)
             );
       }
    }
    this.subscription.unsubscribe();
}

  getAlbums(){
    this.galleryService.getAlbums()
      .subscribe(
          albums => {
             this.allAlbums = albums;
             for(let album of this.allAlbums){
                this.likesArr[album.id] = false;
             }
             this.setList({function:0, place:"Any", month:""});
          },
          error => {
             this.errMessage ='Error Fetching Albums, Please Search Again';
          }
       );
  }
  getAlbumDisplayMessage(){
    this.subscription = this.galleryService.getAlbumDisplayMessage()
    .subscribe(message => {
      console.log(message);
         this.setList(message);

    });
  }
  setList(value){
     let myAlbum1 : Album1[] = [ ];
     let myAlbum2 : Album1[] = [ ];
     let myAlbum3 : Album1[] = [ ];
     if(value.function === 0 && value.place === "Any" && value.month === ""){
        myAlbum1 = this.allAlbums.slice();
        this.setAlbumsList(myAlbum1.slice());
       }
     else{
        if(value.function !== 0){
           for(let album of this.allAlbums){
              if(album.fiFunction === value.function){
                 myAlbum1.push(album);
              }
           }
         }else {
           myAlbum1 = this.allAlbums.slice();
         }
         if(value.place !== "Any"){
            for(let album of myAlbum1){
               if(album.place === value.place){
                  myAlbum2.push(album);
               }
            }
          }else {
            myAlbum2 = myAlbum1.slice();
          }
          if(value.month !== ""){
             for(let album of myAlbum2){
                if(album.month === value.month){
                   myAlbum3.push(album);
                }
              }
           }else {
             myAlbum3 = myAlbum2.slice();
           }
           this.setAlbumsList(myAlbum3.slice());
       }
  }
  setAlbumsList(list:Album1[]) {
     this.myLikesAlbum = 0;
     this.backAlbum = 0;
     this.nextAlbum = 0;
     if(list.length === 0 ){
         this.albumList.length = 0;
         this.selectedAlbum = {
           "id": 1,
           "name": "album1",
           "length": 42,
           "fiFunction": 1,
           "month": "September 2017",
           "place": "London - United Kingdom",
           "description": "A View Pics Wedding",
           "likes": 0,
           "source": 1,
           "uploadedDate": new Date()
         };
         this.myLikesAlbum = this.selectedAlbum.likes;
         this.likesAlbum =  ' ' + this.myLikesAlbum;

         this.setAlbumSource(this.selectedAlbum);
         this.errMessage = "There are no matches, Please try other search options";
     }else{
        this.albumList = list;
        this.selectedAlbum = this.albumList[0];
        this.myLikesAlbum = this.selectedAlbum.likes;
        this.likesAlbum =  ' ' + this.myLikesAlbum;
        this.nextAlbum = this.albumList.length-1;
        this.setAlbumSource(this.selectedAlbum);
   }
  }
  setAlbumSource(album){
    if(album.source === 1){
      this.source = 'Web';
    }
    if(album.source === 2){
      this.source = 'Users';
    }
    if(album.source === 3){
      this.source = 'Captured by us';
    }
    if(album.source === 4){
      this.source = 'Events';
    }
  }

  setSelectedAlbum(album){
     let index:number;
     this.selectedAlbum = album;
     //console.log(pic)
     this.myLikesAlbum = this.selectedAlbum.likes;
     this.likesAlbum =  ' ' + this.myLikesAlbum;

     index = this.albumList.indexOf(this.selectedAlbum);
     this.nextAlbum = (this.albumList.length-1) - index;
     this.backAlbum = index;
     if(this.likesArr[this.selectedAlbum.id]){
         this.likeImage = "like2.png";
     }else{
         this.likeImage = "like1.png";
      }

      this.setAlbumSource(this.selectedAlbum);
      this.selectedPicsCounter = 1;
      this.selectedPicsPath = 'img' + this.selectedPicsCounter + '.jpg';
      this.initPicsControl();
  }
  initPicsControl(){
     this.nextPicture = this.selectedAlbum.length - 1;
     this.backPicture = 0;
     this.selectedPicsCounter = 1;
     this.selectedPicsPath = 'img' + this.selectedPicsCounter + '.jpg';

  }
  onLike(album){
    let index:number;
    index = this.albumList.indexOf(this.selectedAlbum);
    if(this.likesArr[album.id] === false){
       this.likeImage = "like2.png";
       ++this.albumList[index].likes;
       this.likesAlbum =  ' ' + this.selectedAlbum.likes ;
       this.likesArr[album.id] = true;
    }else{
       this.likeImage = "like1.png";
       --this.albumList[index].likes;
       this.likesAlbum =  ' ' + this.selectedAlbum.likes;
       this.likesArr[album.id] = false;
    }
  }
  onBackAlbum(){
    let index:number;
    if(this.backAlbum > 0 && this.backAlbum <= this.albumList.length-1){
      ++this.nextAlbum;
      --this.backAlbum;
      index = this.albumList.indexOf(this.selectedAlbum);
      this.selectedAlbum = this.albumList[--index];
      this.initPicsControl();
    }else{
      this.nextAlbum = 0;
      this.backAlbum = this.albumList.length-1;
      this.selectedAlbum = this.albumList[this.albumList.length-1];
      this.initPicsControl();
    }
    if(this.likesArr[this.selectedAlbum.id]){
       this.likeImage = "like2.png";
    }else{
       this.likeImage = "like1.png";
    }
    this.likesAlbum =  ' ' + this.selectedAlbum.likes ;

  }
  onNextAlbum(){
    let index:number;
    if(this.nextAlbum <= this.albumList.length-1 && this.nextAlbum > 0){
      --this.nextAlbum;
      ++this.backAlbum;
      index = this.albumList.indexOf(this.selectedAlbum);
      this.selectedAlbum = this.albumList[++index];
      this.initPicsControl();
    }else{
      this.nextAlbum = this.albumList.length-1;
      this.backAlbum = 0;
      this.selectedAlbum = this.albumList[0];
      this.initPicsControl();
    }
    if(this.likesArr[this.selectedAlbum.id]){
       this.likeImage = "like2.png";
    }else{
       this.likeImage = "like1.png";
    }
    this.likesAlbum =  ' ' + this.selectedAlbum.likes ;
  }

  onBackPicture(){
    if(this.backPicture > 0 && this.backPicture <= this.selectedAlbum.length ){
      ++this.nextPicture;
      --this.backPicture;
      --this.selectedPicsCounter;
      this.selectedPicsPath = 'img' + this.selectedPicsCounter + '.jpg';
    }else{
      this.nextPicture = 0;
      this.backPicture = this.selectedAlbum.length - 1;
      this.selectedPicsCounter = this.selectedAlbum.length ;
      this.selectedPicsPath = 'img' + this.selectedPicsCounter + '.jpg';
    }
  }
  onNextPicture(){
    if(this.nextPicture <= this.selectedAlbum.length && this.nextPicture > 0){
      --this.nextPicture;
      ++this.backPicture;
      ++this.selectedPicsCounter;
      this.selectedPicsPath = 'img' + this.selectedPicsCounter + '.jpg';
    }else{
      this.nextPicture = this.selectedAlbum.length - 1;
      this.backPicture = 0;
      this.selectedPicsCounter = 1;
      this.selectedPicsPath = 'img' + this.selectedPicsCounter + '.jpg';
    }
  }
  slidePlay(){
    /*this.galleryService.addAlbum(this.allAlbums[7])
     .subscribe(
         data => console.log(data),
         error => console.error(error)
     );*/

     if(this.playPauseImage ==="play.png"){
          this.playPauseImage = "pause.png"
          this.timerId = setInterval(()=> {
          this.onNextPicture(); }, 1000)
      }else{
          this.playPauseImage = "play.png"
          clearInterval(this.timerId)
       }
  }

}
