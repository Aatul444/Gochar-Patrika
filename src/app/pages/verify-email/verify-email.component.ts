import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})

export class VerifyEmailComponent implements OnInit {
  loadingHalt=false;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }
  verifying() {
    this.loadingHalt = true;
    this.authService.sendVerificationMail();
    this.loadingHalt = false;
  }
}

