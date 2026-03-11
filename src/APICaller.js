/**
 * 
 */
class WeatherAPICaller{
    // Field Variables
    location;
    timeline;
    url;

    constructor(location, timeline){
        this.location = location;
        this.timeline = timeline;
        this.buildUrl();
    }
   
    async call(){
        return await this.fetchWeatherData();
    }

    updateParams(location, timeline){
        this.location = location;
        this.timeline = timeline;
        this.buildUrl();
    }

    buildUrl(){
        
        let include = "&include=";
        if(this.timeline === "today"){
            this.location += "/today"
            include += "current,hours";
        }
        else if(this.timeline === "next7days"){
            include += "days";
            this.location += "/tomorrow/next7days";
        }
        else{
            include += "current,days";
        }
        this.url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.location}?unitGroup=metric&key=V3A32Z4J4A38TPMUE9L74ZMAU&contentType=json${include}`;
        

    }

    async fetchWeatherData(){
        const request = new Request(this.url);
        try{
            const response = await fetch(request);
            if(!response.ok){
                throw new Error(response.status);
            }
            else{
                const json = await response.json();
                const parsed_data = this.parseWeatherData(json, this.timeline)
                return parsed_data;
            }
        }
        catch(error){
            
            console.log(error);
        }
    
    }

    parseWeatherData(json, timeline){

        const address = json.resolvedAddress;

        if(timeline === "today"){
            // Extracting current conditions for today
            const current_cond = json.currentConditions;
            const date = json.days[0].datetime;
            const {temp, feelslike, humidity, conditions, icon, visibility, uvindex} = current_cond;
            // Extracting hours data from 6am to 11pm (by 3 hour increments)
            const hours = json.days[0].hours.filter((_, index) => index % 3 === 0 && index >= 6);
            // Packing extracted data and returning it
            const extracted = {address, date,temp, feelslike, humidity, conditions, icon, visibility, uvindex, hours};
            return extracted;
        }
        else if(timeline === "next7days"){
            const week = json.days;
            const filtered = week.map((day) => {
                const {datetime, tempmax, tempmin, icon} = day;
                return {address, datetime, tempmax, tempmin, icon};
            });
            return filtered;

        }
        else{
            throw new Error("Wrong timeline has been passed");
        }

    }
}


export {WeatherAPICaller};