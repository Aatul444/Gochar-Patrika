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
  loadingHalt=false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  google() {
    this.loadingHalt=true;
    this.authService.googleAuth();
    this.loadingHalt=false;
  }

  signUp() {
    this.loadingHalt=true;
    this.authService.signUp(this.newEmailId, this.newPassword);
    this.router.navigate(['/verifyEmail']);
    console.log(this.newEmailId + this.newPassword)
    this.loadingHalt=false;
  }


}
