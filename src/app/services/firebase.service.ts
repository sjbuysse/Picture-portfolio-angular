import { Injectable } from '@angular/core';
import { Image } from 'app/model/image.interface';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import DocumentReference = firebase.firestore.DocumentReference;

@Injectable()
export class FirebaseService  {

  imagesCollection: AngularFirestoreCollection<Image>;
  images: Observable<Image[]>;

  constructor(private _afs: AngularFirestore) {
    this.imagesCollection = this._afs.collection('images'); // reference
    this.images = this.imagesCollection.valueChanges(); // observable of images data
  }

  addImage(image: Image): Promise<DocumentReference> {
    return this.imagesCollection.add(image);
  }

  updateImage(image: Image): Promise<void> {
    return this.imagesCollection.doc(image.id).set(image);
  }

}
