import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TutorialService } from '../tutorial.service';

@Component({
  selector: 'app-del',
  templateUrl: './del.component.html',
  styleUrls: ['./del.component.scss']
})
export class DelComponent implements OnInit {
  firstName = '';
  lastName = '';
  person = {};
  constructor(public crudService: TutorialService, private db: AngularFirestore) { }
  sendData() {
    console.log(this.firstName, this.lastName)
    // let Record:any={};
    // Record['fname'] = this.firstName;
    // Record['lname'] = this.lastName;

    this.crudService.createnew(this.person = { name: this.firstName, last: this.lastName }).then((res) => {
      console.log(res)
    }).catch(error => {
      console.log(error)
    })
  }
  getList() {
    this.crudService.getStudentList()
  }


  ngOnInit(): void {
    this.getList();
  }

}
