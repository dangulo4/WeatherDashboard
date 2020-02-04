$(document).ready(function() {

$('#srchBtn').on('click', function() {
    // Openweather API Key
    let APIKey = 'cf2158542b3abf74447e1153e2d8cf39';
    //let city = '';
    let city = $('#fndCity').val();
    console.log(city);

    //URL to query Openweather API
    let queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' +
    city + '&' + 'appid=' + APIKey;

    // AJAX call to Openweathermap API
    $.ajax({
        url: queryURL,
        method: 'GET'
    })

    // Store data retreived inside object called response
    .then(function (response) {
        //show queryURL
        console.log(queryURL);
        //show object
        console.log(response);

        // Transfer content to show page
        let title   = $('#cityName').addClass('card-title').text(response.name);
        let date    = $('#date').addClass('<card-text').text(moment().format('LLLL'));
        let card    = $('<div>').addClass('card');
        let temp    = $('.temp').addClass('card-text').text('Temperature: ' + response.main.temp + ' °F');
        let humid   = $('.humidity').addClass('card-text').text('Humidity: ' + response.main.humidity + '%');
        let speed   = $('.windSpeed').addClass('card-text').text('Wind Speed: ' + response.wind.speed + ' MPH');
        let desc    = $('.desc').addClass('card-text').text('Description: ' + response.weather[0].description);
        let cardBody = $('<div').addClass('card-body');
        let img      = $('<img>').attr('src', 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png');    
    })
})
});

// let title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
// let card = $("<div>").addClass("card");
// let wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
// let humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
// let temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " °F");
// let cardBody = $("<div>").addClass("card-body");
// let img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");