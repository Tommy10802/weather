import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

import { shareReplay, map } from "rxjs/operators";
import { Observable } from "rxjs";

import { WeatherData } from "./weather-data.model";

@Injectable({ providedIn: "root" })
export class WeatherDataService implements Resolve<any> {
  private dateString: string;
  private records: Observable<WeatherData[]>;

  constructor(private client: HttpClient) {}

  resolve(route: ActivatedRouteSnapshot) {
    var currentDate = new Date();
    var dateString: string = route.queryParams["date"]
      ? route.queryParams["date"]
      : `${currentDate.getFullYear()}/${currentDate.getMonth() +
          1}/${currentDate.getDate()}/`;

    if (this.dateString !== dateString) {
      this.dateString = dateString;
      this.records = this.client
        .get(`https://www.metaweather.com/api/location/44418/${dateString}`)
        .pipe(
          map((data: Object[]) =>
            data.sort(
              (a: any, b: any) =>
                new Date(b.created).getTime() - new Date(a.created).getTime()
            )
          ),
          map((data: Object[]) =>
            data.map((item: Object) => new WeatherData(item))
          ),
          shareReplay(1)
        );
    }

    return this.records;
  }
}
