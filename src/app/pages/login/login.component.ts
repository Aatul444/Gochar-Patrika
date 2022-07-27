import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  newEmailId = '';
  newPassword = ''

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  logIn() {
    this.authService.signIn(this.newEmailId, this.newPassword);
    console.log(this.newEmailId + this.newPassword)
  }

  google() {
    this.authService.googleAuth()
  }


}
