import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  userEmail: string = ' ';
  forgotPassword = new FormGroup(
    {
      userEmail: new FormControl(''),
    })
  loadingHalt=false;

  constructor(public authService: AuthService) { }

  forgotpassword() {
    this.loadingHalt=true;

    this.userEmail != this.forgotPassword.value.userEmail;
    this.authService.forgotPassword(this.userEmail);
    this.forgotPassword.reset();
    this.loadingHalt=false;

  }

  ngOnInit(): void { }

}
