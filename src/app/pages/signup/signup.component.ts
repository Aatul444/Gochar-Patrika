import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  // userid:string = ' ';
  // password:string = ' ';
  newEmailId='';
  newPassword=''
  // signupForm = new FormGroup(
  //     {
  //       userid: new FormControl(''),
  //       password: new FormControl(''),
  //     })
  constructor(private authService:AuthService,private router:Router) { }
  google(){
    this.authService.googleAuth()
  }
  signUp(){
    // this.userid!=this.signupForm.value.userid;
    // this.password!=this.signupForm.value.password;
    this.authService.signUp(this.newEmailId,this.newPassword);
    this.router.navigate(['/verifyEmail']);
    console.log(this.newEmailId+this.newPassword)
    // this.signupForm.reset();
  }
  ngOnInit(): void {
  }

}
