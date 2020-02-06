$(document).ready(function () {

    $('#srchBtn').on('click', function () {
        // Openweather API Key
        let APIKey = 'cf2158542b3abf74447e1153e2d8cf39';
        //let city = '';
        let city = $('#fndCity').val();
        console.log(city);

        //URL to query Openweather API
        let queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' +
            city + '&cnt=40&units=imperial' + '&appid=' + APIKey;
           
        // AJAX call to Openweathermap API
        $.ajax({
                url: queryURL,
                method: 'GET',
                //headers: headers
            })

            // Store data retreived inside object called response
            .then(function (response) {
                //show queryURL
                console.log(queryURL);
                //show object
                console.log(response);

                // AJAX call to Openweathermap API UV
                let lat = response.city.coord.lat;
                let lon = response.city.coord.lon;
                let queryURLUV = 'https://api.openweathermap.org/data/2.5/uvi?' + 'appid=' + APIKey + '&lat=' + lat + '&lon=' + lon;

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

                // // Transfer content to show page
                function renderCurrentResponse() {
                    let title = $('#cityName').addClass('card-title').text(response.city.name + ', ' + response.city.country);
                    let date = $('#date').addClass('card-text').text(moment().format('dddd, MMMM Do'));
                    let card = $('<div>').addClass('card');
                    let tempF = $('.temp').addClass('card-text').text('Temperature: ' + Math.round(response.list[2].main.temp).toPrecision(3)  + ' °F');
                    let humid = $('.humidity').addClass('card-text').text('Humidity: ' + response.list[2].main.humidity + '%');
                    let speed = $('.windSpeed').addClass('card-text').text('Wind Speed: ' + Math.round(response.list[2].wind.speed).toPrecision(2) + ' MPH');
                    let desc = $('.desc').addClass('card-text').text('Description: ' + response.list[2].weather[0].description);
                    let cardBody = $('<div>').addClass('card-body');
                    let img = $('#wicon').attr('src', 'http://openweathermap.org/img/w/' + response.list[3].weather[0].icon + '.png');
                }
                    
                function renderForecastData() {
                    //let unix = 1507473344;
                    let dt = new Date(response.list[9].dt_txt);
                    console.log(dt);
                    //forecast day 1
                    $('#fDate').addClass('card-text').text(moment().add(1, 'day').format('dddd, MMMM Do'));
                    $('<div>').addClass('card');
                    $('.fTemp').addClass('card-text').text('Temperature: ' + Math.round(response.list[0].main.temp).toPrecision(3)  + ' °F');
                    $('.fHumidity').addClass('card-text').text('Humidity: ' + response.list[0].main.humidity + '%');
                    $('.fWindSpeed').addClass('card-text').text('Wind Speed: ' + Math.round(response.list[0].wind.speed).toPrecision(2) + ' MPH');
                    $('.fDesc').addClass('card-text').text('Description: ' + response.list[0].weather[0].description);
                    $('<div>').addClass('card-body');
                    $('#fwicon').attr('src', 'http://openweathermap.org/img/w/' + response.list[0].weather[0].icon + '.png');
                    //forecast day 2
                    $('#f2Date').addClass('card-text').text(moment().add(2, 'day').format('dddd, MMMM Do'));
                    $('<div>').addClass('card');
                    $('.f2Temp').addClass('card-text').text('Temperature: ' + Math.round(response.list[8].main.temp).toPrecision(3)  + ' °F');
                    $('.f2Humidity').addClass('card-text').text('Humidity: ' + response.list[8].main.humidity + '%');
                    $('.f2WindSpeed').addClass('card-text').text('Wind Speed: ' + Math.round(response.list[8].wind.speed).toPrecision(2) + ' MPH');
                    $('.f2Desc').addClass('card-text').text('Description: ' + response.list[8].weather[0].description);
                    $('<div>').addClass('card-body');
                    $('#f2wicon').attr('src', 'http://openweathermap.org/img/w/' + response.list[8].weather[0].icon + '.png');
                    //forecast day 3
                    $('#f3Date').addClass('card-text').text(moment().add(3, 'day').format('dddd, MMMM Do'));
                    $('<div>').addClass('card');
                    $('.f3Temp').addClass('card-text').text('Temperature: ' + Math.round(response.list[16].main.temp).toPrecision(3)  + ' °F');
                    $('.f3Humidity').addClass('card-text').text('Humidity: ' + response.list[16].main.humidity + '%');
                    $('.f3WindSpeed').addClass('card-text').text('Wind Speed: ' + Math.round(response.list[16].wind.speed).toPrecision(2) + ' MPH');
                    $('.f3Desc').addClass('card-text').text('Description: ' + response.list[16].weather[0].description);
                    $('<div>').addClass('card-body');
                    $('#f3wicon').attr('src', 'http://openweathermap.org/img/w/' + response.list[16].weather[0].icon + '.png');
                    //forecast day 4
                    $('#f4Date').addClass('card-text').text(moment().add(4, 'day').format('dddd, MMMM Do'));
                    $('<div>').addClass('card');
                    $('.f4Temp').addClass('card-text').text('Temperature: ' + Math.round(response.list[24].main.temp).toPrecision(3)  + ' °F');
                    $('.f4Humidity').addClass('card-text').text('Humidity: ' + response.list[24].main.humidity + '%');
                    $('.f4WindSpeed').addClass('card-text').text('Wind Speed: ' + Math.round(response.list[24].wind.speed).toPrecision(2) + ' MPH');
                    $('.f4Desc').addClass('card-text').text('Description: ' + response.list[24].weather[0].description);
                    $('<div>').addClass('card-body');
                    $('#f4wicon').attr('src', 'http://openweathermap.org/img/w/' + response.list[24].weather[0].icon + '.png');
                    // forecast day 5
                    $('#f5Date').addClass('card-text').text(moment().add(5, 'day').format('dddd, MMMM Do'));
                    $('<div>').addClass('card');
                    $('.f5Temp').addClass('card-text').text('Temperature: ' + Math.round(response.list[32].main.temp).toPrecision(3)  + ' °F');
                    $('.f5Humidity').addClass('card-text').text('Humidity: ' + response.list[32].main.humidity + '%');
                    $('.f5WindSpeed').addClass('card-text').text('Wind Speed: ' + Math.round(response.list[32].wind.speed).toPrecision(2) + ' MPH');
                    $('.f5Desc').addClass('card-text').text('Description: ' + response.list[32].weather[0].description);
                    $('<div>').addClass('card-body');
                    $('#f5wicon').attr('src', 'http://openweathermap.org/img/w/' + response.list[32].weather[0].icon + '.png');
                }
                

                // response.forEach(day, function(){
                //     let date = new Date(day.dt * 1000);
                //     let days = ['Sun', 'Mon', 'Tues','Wed', 'Thur', 'Fri', 'Sat'];
                //     let name = days[date.getDay()];
                //     $('<div>').addClass('card-body');
                    
                    
                //     response.appendChild(dayBlock);
                // }) 
                    
                
                
                renderCurrentResponse();
                renderForecastData();
                //renderForecastResponse();
            })
    })
});


// forecast.forEach(day => {
//     let date = new Date(day.dt * 1000);
//     let days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
//     let name = days[date.getDay()];
//     let dayBlock = document.createElement("div");
//     dayBlock.className = 'forecast__item';
//     dayBlock.innerHTML =
//       `<div class="forecast-item__heading">${name}</div>
//       <div class="forecast-item__info">
//       <i class="wi ${applyIcon(day.weather[0].icon)}"></i>
//       <span class="degrees">${Math.round(day.temp.day)}
//       <i class="wi wi-degrees"></i></span></div>`;
//     FORECAST.appendChild(dayBlock);
//   });