// state
let currCity = "India";
let units = "metric";

// Selectors
let city = document.querySelector(".weather__city");
let datetime = document.querySelector(".weather__datetime");
let weather__forecast = document.querySelector('.weather__forecast');
let weather__temperature = document.querySelector(".weather__temperature");
let weather__icon = document.querySelector(".weather__icon");
let weather__minmax = document.querySelector(".weather__minmax")
let weather__realfeel = document.querySelector('.weather__realfeel');
let weather__humidity = document.querySelector('.weather__humidity');
let weather__wind = document.querySelector('.weather__wind');
let weather__pressure = document.querySelector('.weather__pressure');

// search
document.querySelector(".weather__search").addEventListener('submit', e => {
    let search = document.querySelector(".weather__searchform");
    // prevent default action
    e.preventDefault();
    // change current city
    currCity = search.value;
    // get weather forecast 
    getWeather();
    // clear form
    search.value = ""
})

// units
document.querySelector(".weather_unit_celsius").addEventListener('click', () => {
    if(units !== "metric"){
        // change to metric
        units = "metric"
        // get weather forecast 
        getWeather()
    }
})

document.querySelector(".weather_unit_farenheit").addEventListener('click', () => {
    if(units !== "imperial"){
        // change to imperial
        units = "imperial"
        // get weather forecast 
        getWeather()
    }
})

function convertTimeStamp(timestamp, timezone){
     const convertTimezone = timezone / 3600; // convert seconds to hours 

    const date = new Date(timestamp * 1000);
    
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: `Etc/GMT${convertTimezone >= 0 ? "-" : "+"}${Math.abs(convertTimezone)}`,
        hour12: true,
    }
    return date.toLocaleString("en-India", options)
   
}

 

// convert country code to name
function convertCountryCode(country){
    let regionNames = new Intl.DisplayNames(["en"], {type: "region"});
    return regionNames.of(country)
}

function getWeather(){
    const API_KEY = 'https://api.openweathermap.org/data/2.5/weather?q=mumbai,india&appid=YOUR_API_KEY'
}

// Fetch weather data for Mumbai, India
fetch('https://api.openweathermap.org/data/2.5/weather?q=Mumbai,IN&appid=YOUR_API_KEY')
    .then(response => response.json())
    .then(data => {
        // Extract the weather icon code from the data
        const weatherIconCode = data.weather[0].icon;

        // Set the weather icon image source dynamically
        document.querySelector('.weather__icon').innerHTML = `
            <img src="https://openweathermap.org/img/wn/${weatherIconCode}.png">
        `;
        // Set the weather min-max temperature
        document.querySelector('.weather__minmax').innerHTML = `
            <p>Min: ${Math.round(data.main.temp_min)}&#176</p>
            <p>Max: ${Math.round(data.main.temp_max)}&#176</p>
        `;
        // Set the real feel temperature
        document.querySelector('.weather__realfeel').innerHTML = `
            ${Math.round(data.main.feels_like)}&#176
        `;
        // Set the humidity
        document.querySelector('.weather__humidity').innerHTML = `
            ${data.main.humidity}%
        `;
        // Set the wind speed
        document.querySelector('.weather__wind').innerHTML = `
            ${data.wind.speed} ${units === "imperial" ? "mph": "m/s"}
        `;
        // Set the pressure
        document.querySelector('.weather__pressure').innerHTML = `
            ${data.main.pressure} hPa
        `;
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });
