import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
//   userid:string = ' ';
// password:string = ' ';
newEmailId='';
newPassword=''

  // loginForm = new FormGroup(
  //   {
  //     userid: new FormControl(''),
  //     password: new FormControl(''),
  //   })

  constructor(private authService:AuthService) {}
  logIn(){
    // this.userid!=this.loginForm.value.userid;
    // this.password!=this.loginForm.value.password;
    this.authService.signIn(this.newEmailId,this.newPassword);
    console.log(this.newEmailId+this.newPassword)

    // console.log(this.loginForm.value)
    // this.LoginForm.reset();
  }
  google(){
    this.authService.googleAuth()
  }
  ngOnInit(): void {
  }

}
