import {WeatherAPICaller} from "./APICaller.js";
import * as Renderer from "./renderer.js";
import "./styles.css";

/** 
const weather_api = new WeatherAPICaller("Edmonton", "today");
const today = await weather_api.call();
console.log(today);
weather_api.updateParams("Edmonton", "next7days");
const week = await weather_api.call();
console.log(week);


const {address, temp, icon} = today;
*/

(async function ScreenController() {
    // Retrieving main dom elements
    const form = document.querySelector("form");
    const today_container = document.querySelector(".current-container");
    const today_forecast = today_container.querySelector(".todays-forecast");
    const hourly_grid = today_container.querySelector(".hourly-grid");
    const cond_grid = document.querySelector(".cond-grid");
    const weekly_forecast = document.querySelector(".weekly-forecast");
    console.log(cond_grid);

    // Calling the API to retrieve data
    const weather_api = new WeatherAPICaller("Edmonton", "today");
    const today = await weather_api.call();
    console.log(today);
    weather_api.updateParams("Edmonton", "next7days");
    const week_data = await weather_api.call();
    console.log(week_data);

    const {address, temp, icon, date, hours} = today;
    // Rendering the page
    Renderer.renderCurrentMainConditions(today_forecast, {address, temp, icon});
    Renderer.renderHourlyForecast(hourly_grid, date, hours);
    Renderer.renderSecondaryConditions(cond_grid, today);
    Renderer.renderWeek(weekly_forecast, week_data);

})();