import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { WeatherData } from "../shared/weather-data.model";

@Component({
  selector: "app-weather-data",
  templateUrl: "./weather-data.component.html",
  styleUrls: ["./weather-data.component.sass"]
})
export class WeatherDataComponent {
  headerColumns: string[] = [
    "datetime",
    "weatherState",
    "temperature",
    "airPressure",
    "humidity"
  ];
  weatherData: WeatherData[];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((resolver: any) => {
      this.weatherData = resolver.data;
    });
  }
}
