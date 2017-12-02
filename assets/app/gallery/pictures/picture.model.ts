export class Picture {
  id: number;
  path: string;
  primaryColor: string;
  secondaryColor: string;
  style: string;
  imageType: number;
  source: number;
  fiFunction: number;
  description : string;
  likes: number;
  uploadedDate : Date;

  constructor(id: number, path: string, primaryColor: string, secondaryColor: string, style: string,
   imageType: number, source: number, fiFunction: number, description : string, likes: number, uploadedDate: Date ) {
      this.id = id;
      this.path = path;
      this.primaryColor = primaryColor;
      this.secondaryColor = secondaryColor;
      this.style = style;
      this.imageType = imageType;
      this.source = source;
      this.fiFunction = fiFunction;
      this.description = description;
      this.likes = likes;
      this.uploadedDate = uploadedDate;
  }
}
