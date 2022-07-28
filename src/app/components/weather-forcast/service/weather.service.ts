import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
const apiKey: string = environment.weatherForCast.apiKey;

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }
  getCurrentWeather(loc: string) {
    return this.http.get(`${environment.weatherForCast.apiUrl}/weather?q=${loc}&appid=${apiKey}`)
  }
  getForecast(loc: string) {
    return this.http.get(`${environment.weatherForCast.apiUrl}/forecast?q=${loc}&appid=${apiKey}`)
  }
  getUv(lat: number, lon: number) {
    let startDate = Math.round(+moment(new Date()).subtract(1, 'week').toDate() / 1000);
    let endDate = Math.round(+moment(new Date()).add(1, 'week').toDate() / 1000);
    return this.http.get(`${environment.weatherForCast.apiUrl}/uvi/history?lat=${lat}&lon=${lon}&start=${startDate}&end=${endDate}&appid=${apiKey}`)
  }
}
