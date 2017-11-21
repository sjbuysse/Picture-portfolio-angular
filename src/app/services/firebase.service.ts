import { Injectable } from '@angular/core';
import { Image } from 'app/model/image.interface';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import DocumentReference = firebase.firestore.DocumentReference;
import { Album } from '../model/album.interface';

@Injectable()
export class FirebaseService  {

  albumsCollection: AngularFirestoreCollection<Album>;
  albums: Observable<Album[]>;
  imagesCollection: AngularFirestoreCollection<Image>;
  images: Observable<Image[]>;

  constructor(private _afs: AngularFirestore) {
    this.albumsCollection = this._afs.collection('albums'); // reference
    this.albums = this.albumsCollection.valueChanges(); // observable of albums data
  }

  addAlbum(album: Album): Promise<DocumentReference> {
    return this.albumsCollection.add(album);
  }

  updateAlbum(album: Album): Promise<void> {
    return this.albumsCollection.doc(album.id).set(album);
  }

  addImage(image: Image, album: Album): Promise<DocumentReference> {
    return this.albumsCollection.doc(album.id).collection('images').add(image);
  }

  updateImage(image: Image, album: Album): Promise<void> {
    return this.albumsCollection.doc(album.id).collection('images').doc(image.id).set(image);
  }

  loadAlbumDetails(albumId: string): Observable<Album> {
    return this.albumsCollection.doc(albumId).valueChanges()
      .map(response => response as Album);
  }

  loadAlbumImages(albumId: string): Observable<Image[]> {
    return this.albumsCollection.doc(albumId).collection('images').valueChanges()
      .map(response => response as Image[]);
  }

  loadAlbums(): Observable<Album[]> {
    return this.albums;
  }
}
