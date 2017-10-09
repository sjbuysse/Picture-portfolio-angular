export class Image {
  id: string;
  name: string;
  caption: string;
  url: string;
}

export class Album {
  id: string;
  name: string;
  images: Image[];
}

export type DataState = Readonly<{
  albums: Album[];
}>;

export const initialDataState = {
  albums: [],
};
