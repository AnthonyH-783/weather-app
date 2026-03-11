import { WeatherAPICaller } from "./APICaller.js";

export class FormHandler{

    TODAY = "today";
    WEEK = "next7days"
    constructor(form){
        this.form = form;
        this.data = null;
        this.error = form.querySelector(".error");
        this.input = form.querySelector("input");

    }
    async getFullForecast(location){
            const current_caller = new WeatherAPICaller(location, this.TODAY);
            const weekly_caller = new WeatherAPICaller(location, this.WEEK);
            try{
                const today_data = await current_caller.call();
                const week_data = await weekly_caller.call();
                this.error.classList.remove("active");
                this.form.reset();
                return {today_data, week_data};
            }
            catch(error){
                this.error.classList.add("active");
                console.error(error);
            }
    }

}