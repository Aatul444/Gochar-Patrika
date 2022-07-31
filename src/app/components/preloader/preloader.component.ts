import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss']
})
export class PreloaderComponent implements OnInit {
  @Input() loaderMessage = 'Loading Please Wait';
  constructor() { }

  ngOnInit(): void {
  }

}
