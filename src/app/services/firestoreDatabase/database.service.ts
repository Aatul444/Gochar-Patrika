import { Injectable } from '@angular/core';
import { CollectionReference, DocumentData, addDoc, collection, deleteDoc, doc, updateDoc, } from '@firebase/firestore';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface newsPost {
  id: string;
  userName:string;
  title: string;
  description: string;
  imgUrl: string;
  // type: string;
  // weight: number;
}

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  private newsCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore, private db: AngularFirestore) {
    this.newsCollection = collection(this.firestore, 'news');
  }

  createNews(obj:any){
    // db.collection('cities').doc('LA').set(data)
    // return this.db.collection('users').doc('ravi').set(obj);
    return this.db.collection('newsPosts').add(obj);
   }

  getAll() {
    return collectionData(this.newsCollection, {
      idField: 'id',
    }) as Observable<newsPost[]>;
  }

  get(id: string) {
    const pokemonDocumentReference = doc(this.firestore, `pokemon/${id}`);
    return docData(pokemonDocumentReference, { idField: 'id' });
  }

  create(pokemon: newsPost) {
    return addDoc(this.newsCollection, pokemon);
  }

  update(pokemon: newsPost) {
    const pokemonDocumentReference = doc(
      this.firestore,
      `pokemon/${pokemon.id}`
    );
    return updateDoc(pokemonDocumentReference, { ...pokemon });
  }

  delete(id: string) {
    const pokemonDocumentReference = doc(this.firestore, `pokemon/${id}`);
    return deleteDoc(pokemonDocumentReference);
  }
}
