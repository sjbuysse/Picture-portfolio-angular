import { createImage, Image } from 'app/model/image.interface';
import { Album, createAlbum } from 'app/model/album.interface';

export type DataState = Readonly<{
  albums: Album[];
  selectedAlbum: Album;
  selectedImage: Image;
}>;


export const initialDataState = {
  albums: [
    {
      id: '1',
      name: 'Uganda',
      caption: 'keis on a trip',
      images: [
        {
          id: '1',
          name: 'kid',
          caption: 'kid happiness all over',
          url: 'http://via.placeholder.com/350x150'
        },
        {
          id: '1',
          name: 'kid',
          caption: 'kid happiness all over',
          url: 'http://via.placeholder.com/350x150'
        },
        {
          id: '1',
          name: 'kid',
          caption: 'kid happiness all over',
          url: 'http://via.placeholder.com/350x150'
        },
        {
          id: '1',
          name: 'kid',
          caption: 'kid happiness all over',
          url: 'http://via.placeholder.com/350x150'
        }
      ]
    },
    {
      id: '2',
      name: 'Greece',
      caption: 'keis on a trip',
      images: [
        {
          id: '1',
          name: 'kid',
          caption: 'kid happiness all over',
          url: 'http://via.placeholder.com/350x150'
        },
        {
          id: '1',
          name: 'kid',
          caption: 'kid happiness all over',
          url: 'http://via.placeholder.com/350x150'
        },
        {
          id: '1',
          name: 'kid',
          caption: 'kid happiness all over',
          url: 'http://via.placeholder.com/350x150'
        },
        {
          id: '1',
          name: 'kid',
          caption: 'kid happiness all over',
          url: 'http://via.placeholder.com/350x150'
        }
      ]
    },
    {
      id: '3',
      name: 'Ardeenz',
      caption: 'keis on a trip',
      images: [
                {
          id: '1',
          name: 'kid',
          caption: 'kid happiness all over',
          url: 'http://via.placeholder.com/350x150'
        },
        {
          id: '1',
          name: 'kid',
          caption: 'kid happiness all over',
          url: 'http://via.placeholder.com/350x150'
        },
        {
          id: '1',
          name: 'kid',
          caption: 'kid happiness all over',
          url: 'http://via.placeholder.com/350x150'
        },
        {
          id: '1',
          name: 'kid',
          caption: 'kid happiness all over',
          url: 'http://via.placeholder.com/350x150'
        }
      ]
    },
    {
      id: '4',
      name: 'Bretagne',
      caption: 'keis on a trip',
      images: [
                {
          id: '1',
          name: 'kid',
          caption: 'kid happiness all over',
          url: 'http://via.placeholder.com/350x150'
        },
        {
          id: '1',
          name: 'kid',
          caption: 'kid happiness all over',
          url: 'http://via.placeholder.com/350x150'
        },
        {
          id: '1',
          name: 'kid',
          caption: 'kid happiness all over',
          url: 'http://via.placeholder.com/350x150'
        },
        {
          id: '1',
          name: 'kid',
          caption: 'kid happiness all over',
          url: 'http://via.placeholder.com/350x150'
        }
      ]
    },
    {
      id: '4',
      name: 'Bretagne',
      caption: 'keis on a trip',
      images: []
    },
    {
      id: '4',
      name: 'Bretagne',
      caption: 'keis on a trip',
      images: []
    },
    {
      id: '4',
      name: 'Bretagne',
      caption: 'keis on a trip',
      images: []
    },
    ],
  selectedAlbum: createAlbum(),
  selectedImage: createImage()
};
