import {WeatherAPICaller} from "./APICaller.js";
import * as Renderer from "./renderer.js";
import { FormHandler } from "./formHandler.js";

import "./styles.css";


window.onload = (evt) => {
    const today_container = document.querySelector(".current-container");
    const today_forecast = today_container.querySelector(".todays-forecast");
    const hourly_grid = today_container.querySelector(".hourly-grid");
    const cond_grid = document.querySelector(".cond-grid");
    const weekly_forecast = document.querySelector(".weekly-forecast");
    const today = new WeatherAPICaller("Edmonton", "today");
    const week = new WeatherAPICaller("Edmonton", "next7days");
    today.call().then((today_data) => {
            week.call().then((week_data) => {
            const dom_params = {today_forecast, weekly_forecast, hourly_grid, cond_grid};
            Renderer.renderPage(dom_params, {today_data, week_data});
        });
    });
}
(function ScreenController() {
    // Retrieving main dom elements
    const form = document.querySelector("form");
    const today_container = document.querySelector(".current-container");
    const today_forecast = today_container.querySelector(".todays-forecast");
    const hourly_grid = today_container.querySelector(".hourly-grid");
    const cond_grid = document.querySelector(".cond-grid");
    const weekly_forecast = document.querySelector(".weekly-forecast");

    addSubmissionListener();

    function addSubmissionListener(){
            form.addEventListener("submit", async (evt) => {
                evt.preventDefault();
                const form_handler = new FormHandler(form);
                const location = form_handler.input.value;
                const data = await form_handler.getFullForecast(location);
                const dom = {form, today_container, today_forecast, hourly_grid, cond_grid, weekly_forecast};
                Renderer.renderPage(dom, data);


    });}

})();