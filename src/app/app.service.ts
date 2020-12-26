import { Injectable } from "@angular/core";

import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {

    onDevice: boolean;

    constructor(private http: HttpClient){
        
    }

    getCurrentWeatherData(lat,long):Observable<any>{
      let url = `https://weather.api.here.com/weather/1.0/report.json?product=observation&latitude=${lat}&longitude=${long}&oneobservation=true&app_id=devportal-demo-20180625&app_code=9v2BkviRwi9Ot26kp2IysQ`;
      return this.http.get(url).pipe(map(res => res));
    }

}
