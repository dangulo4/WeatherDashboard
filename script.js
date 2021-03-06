$(document).ready(function () {
    var cityInput = document.querySelector('#fndCity');
    var cities = document.querySelector('#cities');
    var cityList = document.querySelector('#city-list');

    var cities = [];

    $('#srchBtn').on('click', function () {
        // Openweather API Key
        let APIKey = 'cf2158542b3abf74447e1153e2d8cf39';
        //let city = '';
        let city = $('#fndCity').val();
        console.log(city);

        let queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' +
            city + '&units=imperial&' + 'appid=' + APIKey;

        // AJAX call to Openweathermap API
        $.ajax({
                url: queryURL,
                method: 'GET',
            })

            // Store data retreived inside object called response
            .then(function (response) {
                //show queryURL
                console.log(queryURL);
                //show object
                console.log(response);
                renderCurrentResponse(response);

                renderForecastData(city, APIKey);

                // AJAX call to Openweathermap API UV
                let lat = response.coord.lat;
                let lon = response.coord.lon;
                let queryURLUV = 'https://api.openweathermap.org/data/2.5/uvi?' + 'lat=' + lat + '&lon=' + lon + '&appid=' + APIKey;

                $.ajax({
                        url: queryURLUV,
                        method: 'GET'
                    })

                    //Store data retreived inside object called response
                    .then(function (uv) {
                        //show queryURL UV
                        console.log(queryURLUV);
                        //show object
                        console.log(uv);

                        let uvData = $('#uv').addClass('card-text').text('UV: ' + uv.value);
                    })

            })
    })


    // // Transfer content to show page
    function renderCurrentResponse(response) {
        console.log('calling current forecast', response);
        let title = $('#cityName').addClass('card-title').text(response.name + ', ' + response.sys.country);
        let date = $('#date').addClass('card-text').text(moment().format('dddd, MMMM Do'));
        let card = $('<div>').addClass('card');
        let tempF = $('.temp').addClass('card-text').text('Temperature: ' + Math.round(response.main.temp).toPrecision(3) + ' °F');
        let humid = $('.humidity').addClass('card-text').text('Humidity: ' + response.main.humidity + '%');
        let speed = $('.windSpeed').addClass('card-text').text('Wind Speed: ' + Math.round(response.wind.speed).toPrecision(2) + ' MPH');
        let desc = $('.desc').addClass('card-text').text('Description: ' + response.weather[0].description);
        let cardBody = $('<div>').addClass('card-body');
        let img = $('#wicon').attr('src', 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png');
    }


    function renderForecastData(cityName, APIKey) {
        // AJAX call to Openweathermap API
        $.ajax({
            type: 'GET',
            url: 'https://api.openweathermap.org/data/2.5/forecast?q=' +
                cityName + '&units=imperial' + '&appid=' + APIKey,

            dataType: 'json',
            success: function (forecast) {
                console.log('renderForecastData', forecast.list.length);
                $(".forecast-container").html("<h2 class=\"ml-2\">5-Day Forecast:</h2>").append("<div class=\"row\">");
                // $('#fDate').addClass('card-text').text(moment().add(1, 'day').format('dddd, MMMM Do'));

                for (var i = 0; i < forecast.list.length; i++) {
                    if (forecast.list[i].dt_txt.indexOf('15:00:00') !== -1) {

                        var card = $('<div>').addClass('card-group');
                        var body = $('<div>').addClass('card-body p-2');
                        var title = $("<h5>").addClass("card-title").text(new Date(forecast.list[i].dt_txt).toLocaleDateString());

                        // $('<div>').addClass('card');
                        var fTemp = $('<h6 .fTemp>').addClass('card-text').text('Temperature: ' + Math.round(forecast.list[i].main.temp_max).toPrecision(3) + ' °F');
                        var fHumidity = $('<h6 .fHumidity>').addClass('card-text').text('Humidity: ' + forecast.list[i].main.humidity + '%');
                        var fSpeed = $('<h6 .fWindSpeed>').addClass('card-text').text('Wind Speed: ' + Math.round(forecast.list[i].wind.speed).toPrecision(2) + ' MPH');
                        var fDescription = $('<h6 .fDesc>').addClass('card-text').text('Description: ' + forecast.list[i].weather[0].description);
                        $('<div>').addClass('card-body');
                        var img = $('<img>').attr('src', 'http://openweathermap.org/img/w/' + forecast.list[i].weather[0].icon + '.png');
                        card.append(body.append(title, img, fTemp, fHumidity, fSpeed, fDescription));
                        $('.forecast-container .row').append(card);

                    }
                }

            }

        })
    }

    init();

    function renderCity() {
        // Clear cityList element 
        cityList.innerHTML = '';

        //Render a new li for each city
        for (var i = 0; i < cities.length; i++) {
            var city = cities[i];

            var li = document.createElement('li');
            li.textContent = city;
            li.setAttribute('data-index', i);
            li.setAttribute('class', 'cityUL');

            var button = document.createElement('button');
            // li.setAttribute('class', 'cityBtn');
            button.textContent = 'Remove';
            li.appendChild(button);

            cityList.appendChild(li);
        }
    }

    function init() {
        //Get stored cities from localStorage
        //Parse the JSON string to an object
        var storedCity = JSON.parse(localStorage.getItem('cities'));

        //If cities were retrieved from localStorage, update the cities array to it
        if (storedCity !== null) {
            cities = storedCity;
        }
        //Render cities to the DOM
        renderCity();
    }

    function storeCity() {
        //Stringify and set 'cities' key in localStorage to city array
        localStorage.setItem('cities', JSON.stringify(cities));
    }

    //When submitted
    $('#srchBtn').click(function (event) {
        event.preventDefault();
        var cityText = cityInput.value;
        //Return from function early if submitted cityText is blank
        if (cityText === '') {
            return;
        }

        cities.push(cityText);
        cityInput.value = "";

        storeCity();
        renderCity();
    });

    cityList.addEventListener("click", function (event) {
        var element = event.target;

        //if the element is a button
        if (element.matches('button') === true) {
            //Get the data-index value and remove the city element from the list
            var index = element.parentElement.getAttribute('data-index');
            cities.splice(index, 1);

            //Store updated cities in localStorage and re-render
            storeCity();
            renderCity();
        }
    })

    // $('#srchBtn').click(function(event) {
    //     event.preventDefault();
    //     var element = event.target;

    //storeCity();



});