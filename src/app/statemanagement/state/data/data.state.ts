import { createImage, Image } from 'app/model/image.interface';
import { Album, createAlbum } from 'app/model/album.interface';

export type DataState = Readonly<{
  albums: Album[];
  selectedAlbum: Album;
  selectedImage: Image;
}>;


export const initialDataState = {
  albums: [],
  selectedAlbum: createAlbum(),
  selectedImage: createImage()
};
