import { Image } from './image.interface';

export interface Album {
  id: string;
  name: string;
  caption: string;
  images: Image[];
}

