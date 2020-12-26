import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AppService } from '../app.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  currentLat:any = '';
  currentLong:any = '';
  map:any = '';
  place:any = '';

  constructor(private geolocation: Geolocation, private appserv:AppService) {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentLat = resp.coords.latitude;
      this.currentLong = resp.coords.longitude;
      // resp.coords.latitude
      // resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      this.currentLat = data['coords'].latitude;
      this.currentLong = data['coords'].longitude;
      this.getWeatherInfo(this.currentLat,this.currentLong);
      // data can be a set of coordinates, or an error (if an error occurred).
      // data['coords'].latitude
      // data['coords'].longitude
     });
  }

  weatherData:any[] = [];

  getWeatherInfo(lat,long){
    this.appserv.getCurrentWeatherData(lat,long).subscribe(res=>{
      if(res['observations'] != null){
        this.weatherData = res['observations']['location'];
        console.log(this.weatherData);
      }else{
        this.weatherData = [];
      }
    },(err)=>{
      this.weatherData = [];
    })
  }

}
