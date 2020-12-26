import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  // google maps zoom level
  zoom: number = 14;

  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;

  constructor(public navCtrl: NavController, private geolocation: Geolocation) {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.lat = data['coords'].latitude;
      this.lng = data['coords'].longitude;

    });
  }

  markers: marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: '+5',
      draggable: true
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: '=1',
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      draggable: true
    }
  ]
}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
