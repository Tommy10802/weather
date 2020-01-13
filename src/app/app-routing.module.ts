import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { WeatherDataComponent } from "./weather-data/weather-data.component";
import { WeatherChartComponent } from "./weather-chart/weather-chart.component";
import { WeatherHeatCalculatorComponent } from "./weather-heat-calculator/weather-heat-calculator.component";

import { WeatherDataService } from "./shared/weather-data-resolver.service";

const routes: Routes = [
  { path: "", redirectTo: "/weather-data", pathMatch: "full" },
  {
    path: "weather-data",
    component: WeatherDataComponent,
    resolve: {
      data: WeatherDataService
    },
    runGuardsAndResolvers: "paramsOrQueryParamsChange"
  },
  {
    path: "weather-chart",
    component: WeatherChartComponent,
    resolve: {
      data: WeatherDataService
    },
    runGuardsAndResolvers: "paramsOrQueryParamsChange"
  },
  { path: "weather-heat-calculator", component: WeatherHeatCalculatorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
