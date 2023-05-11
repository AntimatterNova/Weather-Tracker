var searchInput = document.querySelector('#search');
var submitBtn = document.querySelector('#submitSearch');
var historyBox = document.querySelector('#search-history-box');
var curCity = document.querySelector('#curCity');
var curIcon = document.querySelector('#icon');
var curTemp = document.querySelector('#curTemp');
var curWind = document.querySelector('#curWind');
var curHumid = document.querySelector('#curHumid');
var forecastCont = document.querySelector('#forecastCont');
var data;

function renderWeather (city) {
    var weatherSearch = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=a74f5b2196a4b1636be2b2efc00ce135&units=imperial'
    
    fetch(weatherSearch)
    .then(function (res) {
        if (!res.ok) throw new Error('There was an error!')
        
        return res.json();
        })
        .then(function (data) {

            for (var i = 0; i < data.list.length; i += 7) {
                var mainData = data.list[i].main;
                var weatherData = data.list[i].weather[0];

                createWeatherCard(mainData, weatherData);
            };
            console.log(data.list[0]);
        })
        .catch(function (error) {
            console.error(error);
        });

};

function createWeatherCard (mainData, weatherData) {
    var icon = weatherData.icon;
    var date = mainData.dt_text;
    var tempNum = mainData.temp;

    var cardEl = document.createElement('div');
    cardEl.setAttribute('class', 'tile is-child has-text-centered box');
    
    var title = document.createElement('p');
    title.setAttribute('class', 'title');
    title.textContent = date;

    var conditions = document.createElement('ul');

    var temp = document.createElement('li');
    temp.textContent = `Temp: ${tempNum}`;

    var wind = document.createElement('li');
    wind.textContent = 'Wind:';

    var humidity = document.createElement('li');
    humidity.textContent = 'Humidity:'

    conditions.append(temp, wind, humidity);
    cardEl.append(title, conditions);
    forecastCont.append(cardEl);
};

submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    submitInput = document.querySelector('#search').value
    console.log(submitInput);
    renderWeather(submitInput)
    document.querySelector('#search').value = ''
});