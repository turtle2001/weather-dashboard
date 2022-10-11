var search = $("#user-form")
var city = $("#city-input")

function formSubmitHandler(event) {
    event.preventDefault();

    if (city.val())
        getCityInfo(city.val());
};

function getCityInfo(city) {
    var coordinates = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=c5e9fba15567c9fdcf069c213871a2e5';
    var lon, lat;

    fetch(coordinates)
        .then(response => response.json())
        .then(function (data) {
            var weather = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + data[0].lat + '&lon=' + data[0].lon + '&units=imperial&appid=c5e9fba15567c9fdcf069c213871a2e5';

            fetch(weather)
                .then(response => response.json())
                .then(function (data) {
                    displayInfo(data);
                })
        })
}

function displayInfo(data) {
    for (var i = 0; i < data.list.length; i++)
        if (i % 8 == 0)
            fillContainer(data, i / 8);
        else if (i == data.list.length - 1)
            fillContainer(data, 5);
}

function fillContainer(data, x) {
    if (x == 5)
        var cityEl = $("<h4></h4>").text(data.city.name + moment(data.list[39].dt_txt).format(' (MM/D/YYYY)'));
    else
        var cityEl = $("<h4></h4>").text(data.city.name + moment(data.list[x * 8].dt_txt).format(' (MM/D/YYYY)'));

    var tempEl = $("<p></p>").text("Temperature: " + data.list[x].main.temp + " degrees");
    var windEl = $("<p></p>").text("Wind: " + data.list[x].wind.speed + " MPH");
    var humidityEl = $("<p></p>").text("Humidity: " + data.list[x].main.humidity + " %");

    if (x == 0)
        $("#main-container").append(cityEl, tempEl, windEl, humidityEl);
    else
        $("#mini-container" + x).append(cityEl, tempEl, windEl, humidityEl);

    //addButton(cityEl);
}

// function addButton(name) {
//     var buttonEl = $("<button>", { "class": "btn btn-secondary col-12 my-1" });
//     buttonEl.text(name);
//     buttonEl.attr("data-city-name", name);
//     buttonListEl.prepend(buttonEl);
// }

search.click(formSubmitHandler);