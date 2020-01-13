import { Component } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";

import { temperatureRangeValidator } from "../shared/temperature-range.directive";

@Component({
  selector: "app-weather-heat-calculator",
  templateUrl: "./weather-heat-calculator.component.html",
  styleUrls: ["./weather-heat-calculator.component.sass"]
})
export class WeatherHeatCalculatorComponent {
  calculatorForm = new FormGroup(
    {
      temperature: new FormControl("", [Validators.required]),
      unit: new FormControl("celsius"),
      humidity: new FormControl("", [
        Validators.required,
        Validators.max(100),
        Validators.min(0)
      ])
    },
    { validators: temperatureRangeValidator }
  );

  units: Object[] = [
    { name: "Celsius", value: "celsius" },
    { name: "Fahrenheit", value: "fahrenheit" }
  ];
  result: number;

  get temperature() {
    return this.calculatorForm.get("temperature");
  }

  get unit() {
    return this.calculatorForm.get("unit");
  }

  get humidity() {
    return this.calculatorForm.get("humidity");
  }

  calculate() {
    var {
      humidity,
      unit,
      temperature
    }: {
      humidity: number;
      unit: string;
      temperature: number;
    } = this.calculatorForm.value;

    if (unit === "celsius") {
      temperature = (9 / 5) * temperature + 32;
    }

    this.result =
      -42.379 +
      2.04901523 * temperature +
      10.14333127 * humidity -
      0.22475541 * temperature * humidity -
      6.83783 * 10 ** -3 * temperature ** 2 -
      5.481717 * 10 ** -2 * humidity ** 2 +
      1.22874 * 10 ** -3 * temperature ** 2 * humidity +
      8.5282 * 10 ** -4 * temperature * humidity ** 2 -
      1.99 * 10 ** -6 * temperature ** 2 * humidity ** 2;
  }
}
