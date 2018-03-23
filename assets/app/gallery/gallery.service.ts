import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import { Pics } from './pictures/pics';
import { Picture } from './pictures/picture.model';

import { Album } from './albums/album';
import { Album1 } from './albums/album.model';

import { Video } from './videos/video';
import { Video1 } from './videos/video.model';

@Injectable()
export class GalleryService {
  allPictures: Pics[];
  searchList: Pics[];

  allAlbums: Album1[];

  allVideos: Video[];

  headers = new Headers({'Content-Type': 'application/json'});

  private subject = new Subject<any>();
  private albumSubject = new Subject<any>();
  private videoSubject = new Subject<any>();

  constructor(private http: Http) {}

  addPicture(picture: Picture) {
      const body = JSON.stringify(picture);
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.post('https://finestintention.com/pictures', body, {headers: headers})
          .map((response: Response) => {
              return response.json();
          })
          .catch((error: Response) => Observable.throw(error.json()));
  }
  getPictures() {
      return this.http.get('https://finestintention.com/pictures')
          .map((response: Response) => {
              const pictures = response.json().obj;
              let transformedPictures: Picture[] = [];

              for (let pic of pictures) {
                  transformedPictures.push(new Picture (pic.picsId, pic.path, pic.primaryColor, pic.secondaryColor,
                  pic.style, pic.imageType, pic.source, pic.fiFunction, pic.description, pic.likes, pic.uploadedDate));
              }

              return transformedPictures;

          })
          .catch((error: Response) => Observable.throw(error.json()));
  }
  updatePicture(picture:Picture){
    const body = JSON.stringify(picture);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.patch('https://finestintention.com/pictures/' + picture.id, body, {headers: headers})
        .map((response: Response) => response.json())
        .catch((error: Response) => Observable.throw(error.json()));
  }

  sendDisplayMessage(value:{}) {
        this.subject.next(value);
  }
  getDisplayMessage(): Observable<any> {
        return this.subject.asObservable();
  }
  //-----------------------------------------------------------------------
  addAlbum(album: Album) {
      const body = JSON.stringify(album);
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.post('https://finestintention.com/albums', body, {headers: headers})
          .map((response: Response) => {
              return response.json();
          })
          .catch((error: Response) => Observable.throw(error.json()));
  }
  /*getAllAlbums(): Observable<Album[]> {
    const url = `${this.baseUrl}/albums`;
    return this.http.get(url)
      .map(response => response.json() as Album[]);
  }*/
  getAlbums() {
      return this.http.get('https://finestintention.com/albums')
          .map((response: Response) => {
              const albums = response.json().obj;
              let transformedAlbums: Album1[] = [];

              for (let album of albums) {
                  transformedAlbums.push(new Album1 (album.albumId, album.name, album.length, album.fiFunction,
                  album.month, album.place, album.description, album.likes, album.source, album.uploadedDate));
              }
              return transformedAlbums;

          })
          .catch((error: Response) => Observable.throw(error.json()));
  }
  updateAlbum(album:Album1){
    const body = JSON.stringify(album);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.patch('https://finestintention.com/albums/' + album.id, body, {headers: headers})
        .map((response: Response) => response.json())
        .catch((error: Response) => Observable.throw(error.json()));
  }
  sendAlbumDisplayMessage(value:{}) {
        this.subject.next(value);
  }
  getAlbumDisplayMessage(): Observable<any> {
        return this.subject.asObservable();
  }
  //------------------------------------------------------------------------
  addVideo(video: Video) {
      const body = JSON.stringify(video);
      const headers = new Headers({'Content-Type': 'application/json'});
      return this.http.post('https://finestintention.com/videos', body, {headers: headers})
          .map((response: Response) => {
              return response.json();
          })
          .catch((error: Response) => Observable.throw(error.json()));
  }
  /*getAllVideos(): Observable<Video[]> {
    const url = `${this.baseUrl}/videos`;
    return this.http.get(url)
      .map(response => response.json() as Video[]);
  }*/
  getVideos() {
      return this.http.get('https://finestintention.com/videos')
          .map((response: Response) => {
              const videos = response.json().obj;
              let transformedVideos: Video1[] = [];

              for (let video of videos) {
                  transformedVideos.push(new Video1 (video.videoId, video.name, video.duration, video.fiFunction,
                  video.month, video.place, video.description, video.likes, video.source, video.uploadedDate));
              }
              return transformedVideos;

          })
          .catch((error: Response) => Observable.throw(error.json()));
  }
  updateVideo(video:Video1){
    const body = JSON.stringify(video);
    //console.log(video);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.patch('https://finestintention.com/videos/' + video.id, body, {headers: headers})
        .map((response: Response) => response.json())
        .catch((error: Response) => Observable.throw(error.json()));
  }
  sendVideoDisplayMessage(value:{}) {
        this.subject.next(value);
  }
  getVideoDisplayMessage(): Observable<any> {
        return this.subject.asObservable();
  }
}
