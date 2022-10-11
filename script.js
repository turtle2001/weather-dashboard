var search = $("#user-form")
var city = $("#city-input")
var bigBox = $("#main-container")

function formSubmitHandler(event) {
    event.preventDefault();

    if (city.val())
        getCityInfo(city.val());
    // city.val('');

};

function getCityInfo(city) {
    var coordinates = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=c5e9fba15567c9fdcf069c213871a2e5';
    var lon, lat, temp, wind, humidity;

    fetch(coordinates)
        .then(response => response.json())
        .then(function (data) {
            lat = data[0].lat;
            lon = data[0].lon;

            var weather = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&cnt=5&appid=c5e9fba15567c9fdcf069c213871a2e5';

            fetch(weather)
                .then(response => response.json())
                .then(function (data) {
                    temp = data.list[0].main.temp;
                    wind = data.list[0].wind.speed;
                    humidity = data.list[0].main.humidity;
                    displayInfo(city, temp, wind, humidity);
                })
        })
}

function displayInfo(city, temp, wind, humidity) {
    var cityEl = $("<h1></h1>").text(city);
    var tempEl = $("<p></p>").text(temp);
    var windEl = $("<p></p>").text(wind);
    var humidityEl = $("<p></p>").text(humidity);

    bigBox.append(cityEl, tempEl, windEl, humidityEl);
}

search.click(formSubmitHandler);