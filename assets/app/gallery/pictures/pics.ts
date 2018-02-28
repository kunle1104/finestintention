enum FunctionType{
  wedding = 1,
  naming = 2,
  birthday = 3,
  burial = 4,
  others = 5,
  any = 0
}
enum ImageType {
  individual = 1,
  group = 2,
  family = 3,
  multi = 4,
  any = 0
}
enum ImageSource{
  web = 1,
  users = 2,
  captured = 3,
  events = 4,
  any = 0
}
export class Pics {
  id: number;
  path: string;
  primaryColor: string;
  secondaryColor: string;
  style: string;
  imageType: ImageType;
  source: ImageSource;
  function: FunctionType;
  desc: string;
  likes: number;
}
