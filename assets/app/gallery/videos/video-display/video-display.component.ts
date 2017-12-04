import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {Video} from '../video';
import {Video1} from '../video.model';
import {GalleryService} from '../../gallery.service';

@Component({
  selector: 'app-video-display',
  templateUrl: './video-display.component.html',
  styleUrls: ['./video-display.component.css']
})
export class VideoDisplayComponent implements OnInit {
  back:number = 0;
  next:number = 0;
  myLikes:number = 0;
  likes:string = '0';
  liked:boolean = false;
  source:string = '';
  timerId: any;
  playPauseImage:string ="play.png";
  likeImage:string = "like1.png";

  all:Video[]=[];
  allVideos : Video1[] = [];
  videoList : Video1[] = [];
  selectedVideo:Video1 = {
    "id": 1,
    "name": "video1.mp4",
    "duration": 2.18,
    "fiFunction": 5,
    "month": "September 2017",
    "place": "Sydney Australia",
    "description": "Ileya Party",
    "likes": 0,
    "source": 1,
    "uploadedDate": new Date()
  };
  //tempPics : Pics[] = [ ];
  likesArr:any[] = [];

  errMessage : string = 'Loding Videos';

  displayMessage: any;
  subscription: Subscription;
   constructor(private galleryService: GalleryService) { }

   ngOnInit() {
      this.getAllVideos();
      this.getVideoDisplayMessage();
      this.getMyVideos();
   }
   ngOnDestroy() {
     for(let video of this.allVideos){
       //console.log(video.id);
        if(this.likesArr[video.id] == true){
           //++pict.likes;

           this.galleryService.updateVideo(video)
              .subscribe(
                  result => console.log(result)
              );
        }
     }
      this.subscription.unsubscribe();
   }
   getMyVideos(){
     this.galleryService.getAllVideos()
       .subscribe(
           videos => {
              this.all = videos;
           },
           error => {
              console.log('error fetching pictures ******');
              this.errMessage ='Error Fetching Pictures, Please Search Again';
           }
        );
   }
   getAllVideos(){
     this.galleryService.getVideos()
       .subscribe(
           videos => {
             //let tempPics : Pics[];
              this.allVideos = videos;
              for(let video of this.allVideos){
                 this.likesArr[video.id] = false;
              }
              this.setList({function:0, place:"Any", month:""});
              //this.setPicsList(this.allPics);

           },
           error => {
              console.log('error fetching videos');
              this.errMessage ='Error Fetching Videos, Please Search Again';
           }
        );
   }
   getVideoDisplayMessage(){
     this.subscription = this.galleryService.getVideoDisplayMessage()
     .subscribe(message => {
       //console.log(message);
          this.setList(message);

     });
   }
   setList(value){
      //let myPics : Pics[] = [ ];
      let myVideo1 : Video1[] = [ ];
      let myVideo2 : Video1[] = [ ];
      let myVideo3 : Video1[] = [ ];
      //let myAlbum4 : Album[] = [ ];

      if(value.function === 0 && value.place === "Any" && value.month === ""){
         myVideo1 = this.allVideos.slice();
         this.setVideoList(myVideo1.slice());
        }
      else{
         if(value.function !== 0){
            for(let video of this.allVideos){
               if(video.fiFunction === value.function){
                  myVideo1.push(video);
               }
            }
          }else {
            myVideo1 = this.allVideos.slice();
          }
          if(value.place !== "Any"){
             for(let video of myVideo1){
                if(video.place === value.place){
                   myVideo2.push(video);
                }
             }
           }else {
             myVideo2 = myVideo1.slice();
           }
           if(value.month !== ""){
              for(let video of myVideo2){
                 if(video.month === value.month){
                    myVideo3.push(video);
                 }
               }
            }else {
              myVideo3 = myVideo2.slice();
            }
            this.setVideoList(myVideo3.slice());
        }
   }
   setVideoList(list:Video1[]) {
      this.myLikes = 0;
      this.back = 0;
      this.next= 0;
      if(list.length === 0 ){
          this.videoList.length = 0;
          this.selectedVideo = {
            "id": 1,
            "name": "video1.mp4",
            "duration": 2.18,
            "fiFunction": 5,
            "month": "September 2017",
            "place": "Sydney Australia",
            "description": "Ileya Party",
            "likes": 0,
            "source": 1,
            "uploadedDate": new Date()
          };
          this.myLikes = this.selectedVideo.likes;
          this.likes =  ' ' + this.myLikes;

          this.setVideoSource(this.selectedVideo);
          this.errMessage = "There are no matches, Please try other search options";
      }else{
         this.videoList = list;
         this.selectedVideo = this.videoList[0];
         this.myLikes = this.selectedVideo.likes;
         this.likes =  ' ' + this.myLikes;
         this.next = this.videoList.length-1;
         this.setVideoSource(this.selectedVideo);
    }
   }
   setSelectedVideo(video){
     let index:number;
      this.selectedVideo = video;
      //console.log(pic)
      this.myLikes = this.selectedVideo.likes;
      this.likes =  ' ' + this.myLikes;

      index = this.videoList.indexOf(this.selectedVideo);
      this.next = (this.videoList.length-1) - index;
      this.back = index;
      if(this.likesArr[this.selectedVideo.id]){
         this.likeImage = "like2.png";
      }else{
         this.likeImage = "like1.png";
      }

      this.setVideoSource(this.selectedVideo);
   }
   setVideoSource(video){
     if(video.source === 1){
       this.source = 'Web';
     }
     if(video.source === 2){
       this.source = 'Users';
     }
     if(video.source === 3){
       this.source = 'Captured by us';
     }
     if(video.source === 4){
       this.source = 'Events';
     }
   }

   onLike(video){
     let index:number;
     index = this.videoList.indexOf(this.selectedVideo);
     if(this.likesArr[video.id] === false){
        this.likeImage = "like2.png";
        //index = this.picsList.indexOf(this.selectedPics);
        ++this.videoList[index].likes;
        this.likes =  ' ' + this.selectedVideo.likes ;
        this.likesArr[video.id] = true;
     }else{
        this.likeImage = "like1.png";
        //index = this.picsList.indexOf(this.selectedPics);
        --this.videoList[index].likes;
        this.likes =  ' ' + this.selectedVideo.likes;
        this.likesArr[video.id] = false;
     }

   }
   onBack(){
     let index:number;
     if(this.back > 0 && this.back <= this.videoList.length-1){
       ++this.next;
       --this.back;
       index = this.videoList.indexOf(this.selectedVideo);
       this.selectedVideo = this.videoList[--index];
     }else{
       this.next = 0;
       this.back = this.videoList.length-1;
       this.selectedVideo = this.videoList[this.videoList.length-1];
     }
     if(this.likesArr[this.selectedVideo.id]){
        this.likeImage = "like2.png";
     }else{
        this.likeImage = "like1.png";
     }
     this.likes =  ' ' + this.selectedVideo.likes ;
   }
   onNext(){
     let index:number;
     if(this.next <= this.videoList.length-1 && this.next > 0){
       --this.next;
       ++this.back;
       index = this.videoList.indexOf(this.selectedVideo);
       this.selectedVideo = this.videoList[++index];
     }else{
       this.next = this.videoList.length-1;
       this.back = 0;
       this.selectedVideo = this.videoList[0];
     }
     if(this.likesArr[this.selectedVideo.id]){
        this.likeImage = "like2.png";
     }else{
        this.likeImage = "like1.png";
     }
     this.likes =  ' ' + this.selectedVideo.likes ;
   }
   slidePlay(){
     for(let video of this.all){
       console.log(video);
        this.galleryService.addVideo(video)
        .subscribe(
            data => console.log(data),
            error => console.error(error)

        );
     }

   }
}
