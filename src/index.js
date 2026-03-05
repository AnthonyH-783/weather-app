import {WeatherAPICaller} from "./APICaller.js";


const weather_api = new WeatherAPICaller("Edmonton", "today");
console.log(await weather_api.call());