import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { WeatherData } from "../shared/weather-data.model";

@Component({
  selector: "app-weather-chart",
  templateUrl: "./weather-chart.component.html",
  styleUrls: ["./weather-chart.component.sass"]
})
export class WeatherChartComponent implements OnInit {
  chartData: any[];
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = "Date";
  yAxisLabel: string = "Temperature";
  timeline: boolean = true;
  colorScheme: string = "air";

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((resolver: any) => {
      var series: object[] = new Array();

      resolver.data.map((data: WeatherData) => {
        series.push({
          name: data.datetime,
          value: data.temperature
        });
      });

      this.chartData = [
        {
          name: "Temperature",
          series: series
        }
      ];
    });
  }
}
