import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
// import { DatabaseService } from 'src/app/services/firestoreDatabase/database.service';
import { map, finalize } from "rxjs/operators";
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Item } from 'src/app/interfaces/item';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
// export interface Item { name: string; }
export class DashboardComponent implements OnInit {

  imageuploaded!: boolean;
  newsTitle = '';
  newsDescription = ''
  news = {};
  currentUser = JSON.parse(localStorage.getItem('user')!);
  currDate = new Date()
  selectedFile!: File;
  fb!: string;
  downloadURL!: Observable<string>;
  allMyPosts = [];
  private itemsCollection!: AngularFirestoreCollection<Item>;
  items!: Observable<Item[]>;
  
  ngOnInit(): void {
    this.itemsCollection = this.db.collection<Item>('posts');
    // if(this.itemsCollection.)
    this.items = this.itemsCollection.valueChanges();
    // this.db.collection('posts').doc().collection(JSON.stringify(this.currDate).slice(1, 11)).get()
   }
   
  constructor(public authService: AuthService, private http: HttpClient, private db: AngularFirestore, private storage: AngularFireStorage) { }

  postNews() {
    // this.databaseService.createNews(this.news)
    const postingNews = this.db.collection("posts")
    if (this.imageuploaded == true) {
      postingNews.add
        ({
          date: JSON.stringify(this.currDate).slice(1, 11),
          description: this.newsDescription,
          image: this.fb,
          title: this.newsTitle,
          userName: this.currentUser.displayName,
        })
    }
    else {
      postingNews.add
      ({
        date: JSON.stringify(this.currDate).slice(1, 11),
        description: this.newsDescription,
        title: this.newsTitle,
        userName: this.currentUser.displayName,
      })
    }
    this.newsTitle = ' ';
    this.newsDescription = ' '
    this.getPostsNews();
  }
  getPostsNews() {
    const searchByDate = '27 July 2022';
    this.db.collection('posts').get().subscribe(posts => {
      posts.docs.forEach(post => {
        console.log(post.data());
      })
    });
  }
  onFileSelected(event: any) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
              this.imageuploaded = true
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
    this.getPostsNews();
  }

  //  apiUrl = 'https://appusers-725e2-default-rtdb.firebaseio.com/'

  // upload(file: any): Observable<any> {
  //   const formData = new FormData();
  //   formData.append("file", file, file.name);
  //   return this.http.post(this.apiUrl, formData)
  // }
}
