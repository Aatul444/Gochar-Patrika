import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Person } from './person';
@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor(private db: AngularFirestore) { }
  createnew(obj: any) {
    return this.db.collection('users').add(obj);
  }
  
  getStudentDoc(id: string | undefined) {
    return this.db.collection('studentCollection')
      .doc(id)
      .valueChanges()
  }

  getStudentList() {
    // return this.db.collection('studentCollection').doc('1').set({'abc':'123'})
    // .snapshotChanges();
    this.db.collection('users').get().subscribe(e => {
      e.docs.forEach(a => {
        console.log(a.data());
      })
    });
  }
  
  createStudent(student: Person) {
    return new Promise<any>((resolve, reject) => {
      this.db.collection('studentCollection')
        .add(student)
        .then(res => { console.log(res) }, error => reject(error));
    })
  }

  deleteStudent(student: { id: string | undefined; }) {
    return this.db.collection('studentCollection')
      .doc(student.id)
      .delete();
  }

  // updateStudent(student:Person,id: string | undefined){
  //   return this.db.collection('studentCollection')
  //   .doc(id)
  //   .update(
  //     name:student.name,
  //     email:student.email,
  //     studentCourse:student.studentCourse,
  //     fees:student.fees
  //   )
  // }
}
