const apiKey = '572e08fb1d7547f58d8151525211205';
const searchInput = document.getElementById('search');
const currentWeather = document.getElementById('currentweather');
const nextDayWeather = document.querySelector('#nextDayWeather');
const thirdDayWeather = document.querySelector('#thirdDayWeather');
const Today = document.getElementById('today');
const Tomorrow = document.getElementById('tomorrow');
const AfterTomorrow = document.getElementById('afterTomorrow');
const dayMonth = document.getElementById('date');


async function search(cityvalue) {
    
    let response = await fetch(`https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${cityvalue}`);
    responseFetch(response);
};



async function responseFetch(response){
    let responseData = await response.json();
    let cityName = responseData[0].name.split(',')[0];
    

    let forecast = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=3`)
    let responseForecast = await forecast.json();

    
    let tomorrowDate = new Date(responseForecast.forecast.forecastday[1].date).toString().split(' ')[0];
    let afterTomorrowDate = new Date(responseForecast.forecast.forecastday[2].date).toString().split(' ')[0];
    displayDates(tomorrowDate,afterTomorrowDate);
   
    displayData(responseForecast);
}


function displayData(data){
    let currentDayData = data.current;
    currentWeather.innerHTML = `
    <h5 class="text-secondary">${data.location.name}</h5>
    <div class="d-flex align-items-center justify-content-between">
        <h1 class="text-white">${currentDayData.temp_c}<sup>o</sup>C</h1>
        <img src = "${currentDayData.condition.icon}" alt = "icon photo">
    </div>
    <p class="Text">${currentDayData.condition.text}</p>`;
    


    let nextDayData = data.forecast.forecastday[1].day;
    nextDayWeather.innerHTML = `
    <img src = "${nextDayData.condition.icon}" alt = "nextday icon photo">
    <h4 class="text-white pt-4 font-weight-bold">${nextDayData.maxtemp_c}<sup>o</sup>C</h4>
    <p class="text-secondary">${nextDayData.mintemp_c}<sup>o</sup></p>
    <p class="Text">${nextDayData.condition.text}</p>`;

    let thirdDayData = data.forecast.forecastday[2].day;
    thirdDayWeather.innerHTML = `
    <img src = "${thirdDayData.condition.icon}" alt = "nextday icon photo">
    <h4 class="text-white pt-4 font-weight-bold">${thirdDayData.maxtemp_c}<sup>o</sup>C</h4>
    <p class="text-secondary">${thirdDayData.mintemp_c}<sup>o</sup></p>
    <p class="Text">${thirdDayData.condition.text}</p>`;
}

function displayDates(tomorrow,afterTomorrow){
    let today = new Date().toString().split(' ');

    Today.innerHTML = displayDays(today[0]);
    dayMonth.innerHTML = today[2] + today[1];
    Tomorrow.innerHTML = displayDays(tomorrow);
    AfterTomorrow.innerHTML = displayDays(afterTomorrow);
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
