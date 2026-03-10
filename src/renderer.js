import {format} from "date-fns";


const ICONS = "./images/icons/";
/**
 * 
 * @param {Node} container 
 * @param {String} address
 * @param {String} temp
 * @param {String} icon
 */
export function renderCurrentMainConditions(container, {address, temp, icon}){
    // Concerns div.todays-forecast in template
    // Selecting dom elements to mutate
    const location_txt = container.querySelector("#loc-text");
    const temp_txt = container.querySelector("#temp-text");
    const img = container.querySelector("img");

    // Using given information for rendering
    location_txt.innerText = address;
    temp_txt.innerText = parseInt(temp) + "°";
    import(`./images/icons/${icon}.png`).then((module) => img.src = module.default);
    
}
/**
 * 
 * @param {Node} container 
 * @param {Array} hours
 */
export function renderHourlyForecast(container, day, hours){
    // Container will be div.hourly-grid
    // Selecting dom children of the container

    const grid_cells = Array.from(container.children);
    grid_cells.forEach((element, index) => {
        // Selecting concerned dom
        const time = element.querySelector(".hourly-time");
        const temp = element.querySelector(".hourly-temp");
        const img = element.querySelector("img");
        // Extracting and processing hour-specific data
        const datetime = day + "T" + hours[index].datetime;
        const date = new Date(datetime);
        const formated_time = format(date, "h:mm aaaa");
        const temp_txt = parseInt(hours[index].temp) + "°";
        // Setting the data;
        time.innerText = formated_time;
        temp.innerText = temp_txt;
        import(`./images/icons/${hours[index].icon}.png`).then((module) => img.src = module.default);
    });
}

export function renderSecondaryConditions(container, data){
        // container is a div.cond-grid
        // Selecting dom children
        const conditions = Array.from(container.children);
        conditions.forEach((condition) => {
            console.log(condition);
            const name_field = condition.querySelector(".cond-name");
            const value_field = condition.querySelector("[data-metric]");
            const metric = value_field.dataset.metric;
            name_field.innerText = metric;
            value_field.innerText = data[metric];
        })
    }
    /**
     * 
     * @param {*} container 
     * @param {*} data 
     * data contains datetime (yyyy-mm-dd), tempmax, tempmin, and icon
     */
     export async function renderWeekday(container, data){
        // Selecting the dom
        const day_span = container.querySelector(".weekday");
        const img = container.querySelector("img");
        const descr = container.querySelector(".descr");
        const max_span = container.querySelector(".max");
        const min_span = container.querySelector(".min");
        // Formatting some data
        const iso = data.datetime + "T00:00:01"; // Adding one second to avoid midnight (bug)
        const date = new Date(iso);
        const formated_date = format(date, "E");
        
        const icon_url = ICONS + data.icon + ".png";
        console.log(icon_url);
        const {tempmax, tempmin} = data;
        const descr_txt = data.icon.split("-").join(" ");

        // Modifying the dom
        day_span.innerText = formated_date;
        
        descr.innerText = descr_txt;
        max_span.innerText = tempmax;
        min_span.innerText = "/" + tempmin;
        import(`./images/icons/${data.icon}.png`).then((module) => img.src = module.default);
    }
    /**
     * 
     * @param {*} container 
     * @param {*} arr 
     */
    export function renderWeek(container, arr){
        //container refers to div.weekly-forecast
        const weekdays = Array.from(container.children);

        weekdays.forEach((weekday, index) => {
            const data = arr[index];
            renderWeekday(weekday, data);
        })
    }




