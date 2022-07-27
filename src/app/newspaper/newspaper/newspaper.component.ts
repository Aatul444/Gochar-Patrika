import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newspaper',
  templateUrl: './newspaper.component.html',
  styleUrls: ['./newspaper.component.scss']
})
export class NewspaperComponent implements OnInit {
title='Patrika';
  weather:Array<any>=
  [
    {
      'Weatherforcast':'sunshine',
      'Wind':'7km/h',
      'Ther':'21°C',
      'Hum':'82%',
    },
  ];
  newsColumn:any=[]
  constructor() { }

  ngOnInit(): void {
  }

}
