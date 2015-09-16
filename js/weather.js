(function(){

    //Weather
    navigator.geolocation.getCurrentPosition(showPosition,showError);

    function showPosition(position){
        var latlon = position.coords.latitude+","+position.coords.longitude;
        fetch(url.city(latlon),function(data){
            console.log(data);
            stored.currentCity = data.query.results.Result.city;
            stored.currentCountry = data.query.results.Result.country;
            stored.currentWoeid = data.query.results.Result.woeid;
            stored.currentInfo = [stored.currentCity, stored.currentWoeid];
            getWeather();
        });
    }

    function showError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                console.log("User denied the request for Geolocation.")
                break;
            case error.POSITION_UNAVAILABLE:
                console.log("Location information is unavailable.")
                break;
            case error.TIMEOUT:
                console.log("The request to get user location timed out.")
                break;
            case error.UNKNOWN_ERROR:
                console.log("An unknown error occurred.")
                break;
        }
    } 

    function getWeather(){
        fetch(url.weather(stored.currentWoeid),function(data){
            stored.fahrenheit = data.query.results.channel.item.condition.temp;
            stored.weatherImg = data.query.results.channel.item.condition.code;
            stored.celsius = (stored.fahrenheit-32)*5/9;
            stored.celsiusRound = Math.round(stored.celsius * 1 ) / 1 + "°C";
            stored.fahrenheitRound = stored.fahrenheit + "°F";
            stored.wText = data.query.results.channel.item.condition.text;

            $(data.query.results.channel.item.forecast).each(function (index, forecasts) {
                if(index<3){
                    //console.log(forecasts.day);
                    var celsiusH = (forecasts.high-32)*5/9;
                    var celsiusHRound = Math.round( celsiusH * 1 ) / 1 + "°";
                    var fahrenheitHRound = forecasts.high + "°";
                    var celsiusL = (forecasts.low-32)*5/9;
                    var celsiusLRound = Math.round( celsiusL * 1 ) / 1 + "°";
                    var fahrenheitLRound = forecasts.low + "°";

                    stored.celsiusForecasts.push('<li class="condition wc-showers"><span class="name">'+forecasts.day+
                        '</span><span class="tempIcon"><img alt="Mostly Cloudy" src="images/plain_weather/flat_white/png/'+forecasts.code+
                        '.png"></span><span class="temperature"><span class="hi-c">'+celsiusHRound+
                        '</span><span class="lo-c">'+celsiusLRound+
                        '</span></span><div class="clear"></div></li>');
                    stored.fahrenheitForecasts.push('<li class="condition wc-showers"><span class="name">'+forecasts.day+
                        '</span><span class="tempIcon"><img alt="Mostly Cloudy" src="images/plain_weather/flat_white/png/'+forecasts.code+
                        '.png"></span><span class="temperature"><span class="hi-c">'+fahrenheitHRound+'</span><span class="lo-c">'+fahrenheitLRound+
                        '</span></span><div class="clear"></div></li>');
                    
                }
            });
            //localStorage.setItem("lStored", stored);

            localStorage.setItem('localStored', JSON.stringify(stored));

            // Retrieve the object from storage
            var retrievedObject = localStorage.getItem('localStored');

            lStored = JSON.parse(retrievedObject);
            showWeather();
        })
    }

    function showWeather(){
        if(!(localStorage.getItem('localStored') === null)){
            $('.weather .type').html(lStored.wText+'<br>'+lStored.currentInfo[0]);
            $('.weather .temp').html(lStored.celsiusRound);
            $('.weather.fahrenheit .temp').html(lStored.fahrenheitRound);
            $('.weather .tempImg').html("<img alt='"+ lStored.wText +"' src='images/plain_weather/flat_white/png/"+lStored.weatherImg+".png'>");

            $('.weather.celsius ul.forecast').append(lStored.celsiusForecasts);
            $('.weather.fahrenheit ul.forecast').append(lStored.fahrenheitForecasts);
        }
    }

    
    if(localStorage.getItem("tempFormat") == 'celsius' || localStorage.getItem("tempFormat") == null){
        $('.weather.fahrenheit').hide();
        $('.weather.celsius').show();
    }else {
        $('.weather.fahrenheit').show();
        $('.weather.celsius').hide();
    }

    $( ".weather" ).dblclick(function() {
        if($(this).hasClass('celsius')){
            $('.weather.fahrenheit').show();
            $('.weather.celsius').hide();
            localStorage.setItem("tempFormat", 'fahrenheit');
        }else{
            $('.weather.fahrenheit').hide();
            $('.weather.celsius').show();
            localStorage.setItem("tempFormat", 'celsius');
        }
    });

    showWeather();

})();