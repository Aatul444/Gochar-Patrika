import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { Item } from 'src/app/interfaces/item';

@Component({
  selector: 'app-newspaper',
  templateUrl: './newspaper.component.html',
  styleUrls: ['./newspaper.component.scss']
})

export class NewspaperComponent implements OnInit {

  private itemsCollection!: AngularFirestoreCollection<Item>;
  items!: Observable<Item[]>;

  title = 'Patrika';
  getDate = new Date();
  todaysDate = JSON.stringify(this.getDate).slice(1, 11)
  newsColumn: any = []

  ngOnInit(): void {
    this.itemsCollection = this.db.collection<Item>('posts', ref => ref.where('date', '==', this.todaysDate));
    this.items = this.itemsCollection.valueChanges();
    console.log(this.items);
  }
  
  constructor(private db: AngularFirestore, private storage: AngularFireStorage) { }

}
