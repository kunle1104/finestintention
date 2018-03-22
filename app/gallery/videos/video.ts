enum FunctionType{
  wedding = 1,
  naming = 2,
  birthday = 3,
  burial = 4,
  others = 5,
  any = 0
}
enum ImageSource{
  web = 1,
  users = 2,
  captured = 3,
  events = 4,
  any = 0
}
export class Video {
  id: number;
  name:string;
  duration: number;
  function: FunctionType;
  month: string;
  place:string;
  description:string;
  likes: number;
  source: ImageSource;
}
