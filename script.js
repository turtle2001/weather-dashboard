var search = $("#user-form")
var city = $("#city-input")

function formSubmitHandler(event) {
    event.preventDefault();

    if (city.val())
        getCityInfo(city.val());
    // city.val('');

};

function getCityInfo(city) {
    var coordinates = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=c5e9fba15567c9fdcf069c213871a2e5';
    var lon;
    var lat;

    fetch(coordinates)
        .then(response => response.json())
        .then(function (data) {
            lat = data[0].lat;
            lon = data[0].lon;

            var weather = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&units=imperial&cnt=5&appid=c5e9fba15567c9fdcf069c213871a2e5';

            fetch(weather)
                .then(response => response.json())
                .then(function (data) {
                    console.log(data.list[0].main.temp);
                })
        })
}

search.click(formSubmitHandler);