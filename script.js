var search = $("#user-form")
var city = $("#city-input")
var buttons = $("#button-list")
var cityList = []

//shows buttons form local storage
showButtons();

//starts when form is submitted
function formSubmitHandler(event) {
    event.preventDefault();

    if (city.val())
        getCityInfo(city.val());

    city.val("");
};

//take city name and turns into lon and lat for other fetch to use
function getCityInfo(city) {
    var coordinates = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=c5e9fba15567c9fdcf069c213871a2e5';

    fetch(coordinates)
        .then(response => response.json())
        .then(function (data) {
            var weather = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + data[0].lat + '&lon=' + data[0].lon + '&units=imperial&appid=c5e9fba15567c9fdcf069c213871a2e5';

            fetch(weather)
                .then(response => response.json())
                .then(function (data) {
                    displayInfo(data);
                    addButton(data.city.name);
                })
        })
}

//chooses what data to dispaly
function displayInfo(data) {
    $("#main-container").empty();
    for (var i = 1; i <= 5; i++)
        $("#mini-container" + i).empty();

    for (var i = 0; i < data.list.length; i++)
        if (i % 8 == 0)
            fillContainer(data, i / 8);
        else if (i == data.list.length - 1)
            fillContainer(data, 5);
}

//displays the wanted information
function fillContainer(data, x) {
    if (x == 5)
        var cityEl = $("<h4></h4>").text(data.city.name + moment(data.list[39].dt_txt).format(' (MM/D/YYYY)'));
    else
        var cityEl = $("<h4></h4>").text(data.city.name + moment(data.list[x * 8].dt_txt).format(' (MM/D/YYYY)'));

    var tempEl = $("<p></p>").text("Temperature: " + data.list[x].main.temp + " ℉");
    var windEl = $("<p></p>").text("Wind: " + data.list[x].wind.speed + " MPH");
    var humidityEl = $("<p></p>").text("Humidity: " + data.list[x].main.humidity + " %");

    if (x == 0)
        $("#main-container").append(cityEl, tempEl, windEl, humidityEl);
    else
        $("#mini-container" + x).append(cityEl, tempEl, windEl, humidityEl);
}

//adds buttons to call from local storage
function addButton(name) {
    for (var i = 1; i < localStorage.length; i++) {
        cityList[i - 1] = localStorage.getItem(i);
    }

    if (!cityList.includes(name)) {
        cityList.push(name);
        localStorage.setItem(cityList.length + 1, name);
        localStorage.setItem(0, cityList.length);

        var buttonEl = $("<button>", { "class": "btn btn-secondary col-12 my-1" });
        buttonEl.text(name);
        buttonEl.attr("city-name", name);
        buttons.prepend(buttonEl);
    }
}

//starts on refresh to show buttons of previous cities
function searchPrev(event) {
    var city2 = event.target.getAttribute("city-name");
    getCityInfo(city2);
}

function showButtons() {
    for (var i = 1; i <= localStorage.getItem(0); i++) {
        var buttonEl = $("<button>", { "class": "btn btn-secondary col-12 my-1" });
        buttonEl.text(localStorage.getItem(i));
        buttons.prepend(buttonEl);
    }
}

search.click(formSubmitHandler);
buttons.click(searchPrev);