$(document).ready(function () {

    $('#srchBtn').on('click', function () {
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

                // AJAX call to Openweathermap API UV
                let lat = response.coord.lat;
                let lon = response.coord.lon;
                let queryURLUV = 'https://api.openweathermap.org/data/2.5/uvi?' + 'appid=' + APIKey + '&lat=' + lat + '&lon=' + lon;

                $.ajax({
                        url: queryURLUV,
                        method: 'GET'
                    })

                    // Store data retreived inside object called response
                    .then(function (uv) {
                        //show queryURL UV
                        console.log(queryURLUV);
                        //show object
                        console.log(uv);

                        let uvData = $('#uv').addClass('card-text').text('UV: ' + uv.value);
                    })

                // Transfer content to show page
                let title = $('#cityName').addClass('card-title').text(response.name);
                let date = $('#date').addClass('<card-text').text(moment().format('LLLL'));
                let card = $('<div>').addClass('card');
                // Converts the temp to Kelvin with the below formula
                let tempF = $('.temp').addClass('card-text').text('Temperature: ' + ((response.main.temp - 273.15) * 1.80 + 32).toPrecision(3) + ' °F');
                let humid = $('.humidity').addClass('card-text').text('Humidity: ' + response.main.humidity + '%');
                let speed = $('.windSpeed').addClass('card-text').text('Wind Speed: ' + response.wind.speed + ' MPH');
                let desc = $('.desc').addClass('card-text').text('Description: ' + response.weather[0].description);
                let cardBody = $('<div>').addClass('card-body');
                let img = $('#wicon').attr('src', 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png');

            })
    })
});
