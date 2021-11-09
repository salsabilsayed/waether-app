const apiKey = '572e08fb1d7547f58d8151525211205';
const searchInput = document.getElementById('search');
const currentWeather = document.getElementById('currentweather');
const nextDayWeather = document.querySelector('#nextDayWeather');
const thirdDayWeather = document.querySelector('#thirdDayWeather');
const Today = document.getElementById('today');
const Tomorrow = document.getElementById('tomorrow');
const AfterTomorrow = document.getElementById('afterTomorrow');
const dayMonth = document.getElementById('date');

// data from API
async function search(cityvalue) {
    
    let response = await fetch(`https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${cityvalue}`);
    let responseData = await response.json();
    let cityName = responseData[0].name.split(',')[0];
    forecasting(cityName);
};

async function forecasting(cityName){
    
    const forecast = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=3`)
    const responseForecast = await forecast.json();

    displayDates(responseForecast);
   
    displayData(responseForecast);
}

/// display data functions
function displayData(data){
    
    displayCurrentDay(data);
    displayNextDay(data);
    displaythirdDay(data);
}


// data for tody
function displayCurrentDay(data){
    const currentDayData = data.current;
    const {temp_c, condition} = currentDayData

    currentWeather.innerHTML = `
    <h5 class="text-secondary">${data.location.name}</h5>
    <div class="d-flex align-items-center justify-content-between">
        <h1 class="text-white">${temp_c}<sup>o</sup>C</h1>
        <img src = "https:${condition.icon}" alt = "icon photo">
    </div>
    <p class="Text">${condition.text}</p>`;
}

// data for next day
function displayNextDay(data){

    const nextDayData = data.forecast.forecastday[1].day;
    const {condition, maxtemp_c, mintemp_c} = nextDayData;

    nextDayWeather.innerHTML = `
    <img src = "https:${condition.icon}" alt = "nextday icon photo">
    <h4 class="text-white pt-4 font-weight-bold">${maxtemp_c}<sup>o</sup>C</h4>
    <p class="text-secondary">${mintemp_c}<sup>o</sup></p>
    <p class="Text">${condition.text}</p>`;

}

// data for third day
function displaythirdDay(data){
    const thirdDayData = data.forecast.forecastday[2].day;
    const {condition, maxtemp_c, mintemp_c} = thirdDayData;

    thirdDayWeather.innerHTML = `
    <img src = "https:${condition.icon}" alt = "nextday icon photo">
    <h4 class="text-white pt-4 font-weight-bold">${maxtemp_c}<sup>o</sup>C</h4>
    <p class="text-secondary">${mintemp_c}<sup>o</sup></p>
    <p class="Text">${condition.text}</p>`;
}

// displaying dates
function displayDates(responseForecast){

    const tomorrowDate = new Date(responseForecast.forecast.forecastday[1].date).toString().split(' ')[0];
    const afterTomorrowDate = new Date(responseForecast.forecast.forecastday[2].date).toString().split(' ')[0];

    let today = new Date().toString().split(' ');
    Today.innerHTML = displayDays(today[0]);
   
    dayMonth.innerHTML = today[2] + today[1];
  
    Tomorrow.innerHTML = displayDays(tomorrowDate);
    AfterTomorrow.innerHTML = displayDays(afterTomorrowDate);
}

function displayDays(day){
    switch(day){
        case "Sun":
        case "Mon":
        case "Fri":
            day = day+"day";
            break;
        case "Sat":
            day = day+"erday";
            break;
        case "Tue":
            day = day+"sday";
            break;
        case "Wed":
            day = day+"nesday";
            break;
        case "Thu":
            day = day+"rsday";
            break;
    }
    return day;
}

search('cairo');
searchInput.addEventListener('keyup', function(){
    search(searchInput.value);
});
