import { ValidatorFn, FormGroup, ValidationErrors } from "@angular/forms";

export const temperatureRangeValidator: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  var unit: string = control.get("unit").value;
  var temperature: string = control.get("temperature").value;

  return (temperature != "" &&
    parseFloat(temperature) &&
    unit === "celsius" &&
    parseFloat(temperature) < 26.7) ||
    (temperature != "" &&
      parseFloat(temperature) &&
      unit === "fahrenheit" &&
      parseFloat(temperature) < 80)
    ? { temperatureRange: true }
    : null;
};
