export class WeatherData {
  datetime: Date;
  weatherState: string;
  temperature: number;
  airPressure: number;
  humidity: number;

  constructor(data: any) {
    this.datetime = new Date(data.created);
    this.weatherState = data.weather_state_name;
    this.temperature = data.the_temp;
    this.airPressure = data.air_pressure;
    this.humidity = data.humidity;
  }
}
