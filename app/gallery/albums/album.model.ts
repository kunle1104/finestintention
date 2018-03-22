export class Album1 {
  id: number;
  name: string;
  length: number;
  fiFunction: number;
  month: string;
  place: string;
  description:string;
  likes: number;
  source: number;
  uploadedDate: Date;

  constructor(id:number, name:string, length:number, fiFunction:number, month:string,
              place:string, description:string, likes:number, source:number, uploadedDate:Date){
    this.id = id;
    this.name = name;
    this.length = length;
    this.fiFunction = fiFunction;
    this.month = month;
    this.place = place;
    this.description = description;
    this.likes = likes;
    this.source = source;
    this.uploadedDate = uploadedDate;

  }
}
