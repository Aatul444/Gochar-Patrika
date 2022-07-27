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
  newEmailId = '';
  newPassword = ''

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  google() {
    this.authService.googleAuth()
  }

  signUp() {
    this.authService.signUp(this.newEmailId, this.newPassword);
    this.router.navigate(['/verifyEmail']);
    console.log(this.newEmailId + this.newPassword)
  }


}
