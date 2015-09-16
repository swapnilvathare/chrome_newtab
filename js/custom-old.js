var chromeNewTab = {
    init:function(){
        this.sections.inspirationalQuote();
        this.sections.changeBackground();
        //this.sections.latoFont();
        this.sections.currentTime();
        this.sections.getCurrentWeather();
        //this.sections.weather();
        this.sections.googleSearch();
        this.sections.mainMenu();
        this.sections.weatherToggle();
    },


    sections: {

        //Weather
        getCurrentWeather: function(){
            getLocation();
            var currentInfo;
            var currentCountry;
            var scoreAvailable;
            function getLocation() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showPosition,showError);
                } else {
                    console.log("Geolocation is not supported by this browser.");
                }
            }

            function showPosition(position) {
                var latlon = position.coords.latitude+","+position.coords.longitude;
                //console.log(latlon);
                //var getWoeid = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20geo.placefinder%20where%20text%3D%'+latlon+'%22%20and%20gflags%3D%22R%22&format=json&diagnostics=true&callback='
                $.ajax({
                    url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20geo.placefinder%20where%20text%3D"'+latlon+'%22%20and%20gflags%3D%22R%22&format=json&diagnostics=true&callback=',
                    dataType: 'json',
                    success: function (data) {
                        var currentCity = data.query.results.Result.city;
                        currentCountry = data.query.results.Result.country;
                        var currentWoeid = data.query.results.Result.woeid;

                        //console.log(currentCity+" "+currentWoeid);
                        currentInfo = [currentCity, currentWoeid];
                        //console.log(currentInfo);
                        //chromeNewTab.sections.weather();
                        weather();
                        //console.log('country '+ currentCountry);
                        if(currentCountry == 'India'){
                            //cricketScore();
                        }
                       
                    },
                    error: function () {}
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

            function weather(){
                $('.weather .tempImg').html(localStorage.getItem("tempImg"));
                $('.weather .temp').html(localStorage.getItem("temp"));
                $('.weather .type').html(localStorage.getItem("wType"));
                $('ul.forecast').html(localStorage.getItem("sForcast"));

                $.ajax({
                    url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D'+currentInfo[1]+'&format=json&diagnostics=true&callback=',
                    //https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D29220291&format=json&diagnostics=true&callback=
                    dataType: 'json',
                    success: function (data) {
                        var fahrenheit = data.query.results.channel.item.condition.temp;
                        var weatherImg = data.query.results.channel.item.condition.code;
                        var celsius = (fahrenheit-32)*5/9;
                        var celsiusRound = Math.round( celsius * 1 ) / 1 + "°C";
                        var fahrenheitRound = fahrenheit + "°F";
                        var wText = data.query.results.channel.item.condition.text
                        //var wText = data.query.results.channel.item.description
                        //console.log(celsiusRound);
                        $('.weather .type').html(wText+'<br>'+currentInfo[0]);
                        //$('.weather .type').html(data.query.results.channel.item.description);
                        $('.weather .temp').html(celsiusRound);
                        $('.weather.fahrenheit .temp').html(fahrenheitRound);
                        $('.weather .tempImg').html("<img alt='"+ wText +"' src='images/plain_weather/flat_white/png/"+weatherImg+".png'>");

                        localStorage.removeItem("tempImg");
                        localStorage.removeItem("temp");
                        localStorage.removeItem("wType");
                        localStorage.setItem("tempImg", "<img alt='"+ wText +"' src='images/plain_weather/flat_white/png/"+weatherImg+".png'>");
                        localStorage.setItem("temp", celsiusRound);
                        localStorage.setItem("wType", wText+'<br>'+currentInfo[0]);
                        // $('.weather .tempImg').html("<img alt='"+ wText +"' src='images/plain_weather/light/png/"+weatherImg+".png'>");

                        $('ul.forecast').empty();

                        $(data.query.results.channel.item.forecast).each(function (index, forecasts) {
                            if(index<3){
                                //console.log(forecasts.high);
                                var celsiusH = (forecasts.high-32)*5/9;
                                var celsiusHRound = Math.round( celsiusH * 1 ) / 1 + "°";
                                var fahrenheitHRound = forecasts.high + "°";
                                var celsiusL = (forecasts.low-32)*5/9;
                                var celsiusLRound = Math.round( celsiusL * 1 ) / 1 + "°";
                                var fahrenheitLRound = forecasts.low + "°";
                                var celsiusForecasts = '<li class="condition wc-showers"><span class="name">'+forecasts.day+'</span><span class="tempIcon"><img alt="Mostly Cloudy" src="images/plain_weather/flat_white/png/'+forecasts.code+'.png"></span><span class="temperature"><span class="hi-c">'+celsiusHRound+'</span><span class="lo-c">'+celsiusLRound+'</span></span><div class="clear"></div></li>'
                                var fahrenheitForecasts = '<li class="condition wc-showers"><span class="name">'+forecasts.day+'</span><span class="tempIcon"><img alt="Mostly Cloudy" src="images/plain_weather/flat_white/png/'+forecasts.code+'.png"></span><span class="temperature"><span class="hi-c">'+fahrenheitHRound+'</span><span class="lo-c">'+fahrenheitLRound+'</span></span><div class="clear"></div></li>'
                                $('.weather.celsius ul.forecast').append(celsiusForecasts);
                                $('.weather.fahrenheit ul.forecast').append(fahrenheitForecasts);
                            }
                        });
                        var forcast = $('ul.forecast').html();
                        localStorage.removeItem("sForcast");
                        localStorage.setItem("sForcast", forcast);
                    },
                    error: function () {}
                });
            }
        },

        //Inspirational Quote
        inspirationalQuote: function(){
            var todayDate = new Date();
            todayDate = todayDate.getDate();

            if((!(todayDate == localStorage.getItem("storedDate")))||(typeof localStorage.getItem("storedDate") === 'undefined')||(localStorage.getItem("storedDate") === null)||(typeof localStorage.getItem("storedQuote") === 'undefined')||(localStorage.getItem("storedQuote") === null)){
                
                newQuote();
                function newQuote(){
                    $.getJSON('json/quotes.json', function(data) { 
                      var entry = data.Quotes[Math.floor(Math.random()*data.Quotes.length)];
                      //console.log(entry.quote);

                        localStorage.setItem("storedQuote", entry.quote);
                        localStorage.setItem("storedAuthor", entry.author);
                        $('.quote').html(localStorage.getItem("storedQuote")+'"<br> - '+ localStorage.getItem("storedAuthor"));
                      //do the same exact thing with entry
                    })

                }
            }

            if(!(localStorage.getItem("storedQuote") === null))
                $('.quote').html(localStorage.getItem("storedQuote")+'"<br> - '+ localStorage.getItem("storedAuthor"));
        },

        //Weather toggle
        weatherToggle: function(){
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
        },

        //Search
        googleSearch: function(){
            $('.search').click(function(){
                var searchText = $('.searchField').val();
                //console.log(searchText);
                if(!(searchText="")){
                    var searchText = $('.searchField').val();
                    //console.log(searchText);
                    var searchUrl = "http://www.google.com/search?q="+searchText;
                    // window.location.href = "http://www.google.com/search?q="+searchText;
                    window.location.href = searchUrl;
                }
            })    
            //http://googlesuggest-jquery.googlecode.com/svn/trunk/demo.html
            $('input.searchField').googleSuggest({ service: 'web' });
            $(document).keypress(function(e) {
                if(e.which == 13) {
                    //console.log('You pressed enter!');
                    if($(".searchField").is(":focus")){
                        if(!(searchText="")){
                            var searchText = $('.searchField').val();
                            //console.log(searchText);
                            var searchUrl = "http://www.google.com/search?q="+searchText;
                            window.location.href = searchUrl;
                        }
                        return false;
                    }
                }
            });
        },

        //Time
        currentTime: function(){
            window.onload = function(){date()}, setInterval(function(){date()}, 1000);

            function date() {
                var now = new Date();
                var hour = now.getHours();
                var ampm = hour >= 12 ? 'pm' : 'am';
                hour = ((hour + 11) % 12 + 1);
                // now = ((now.getHours()<10?'0':'') + now.getHours())+':'+((now.getMinutes()<10?'0':'') + now.getMinutes())+':'+((now.getSeconds()<10?'0':'') + now.getSeconds());
                // now = ((hour<10?'0':'') + hour)+':'+((now.getMinutes()<10?'0':'') + now.getMinutes())+':'+((now.getSeconds()<10?'0':'') + now.getSeconds());
                time = ((hour<10?'0':'') + hour)+':'+((now.getMinutes()<10?'0':'') + now.getMinutes()+'<sup>'+ampm+'</sup>');
                //time = ((hour<10?'0':'') + hour)+':'+((now.getMinutes()<10?'0':'') + now.getMinutes());

                
                $('#dateTime .time').html(time);

                //var d = new Date();

            }  
        },     

        //Menu
        mainMenu: function(){
            $('.outer-nav a.chrome').click(function(e) {
                e.preventDefault();
                var link = $(this).attr('href');
                chrome.tabs.update({
                    url: link
                });
            });            
        },

        //Background
        changeBackground: function(){
            var todayDate = new Date();
            todayDate = todayDate.getDate();
            if((localStorage.getItem("storedDate") === null)){
                localStorage.setItem("storedImgNum", 2);    
            }
            console.log(localStorage.getItem("storedImgNum"));
            $('.imageWrapper').css({
                background:'url(images/'+localStorage.getItem("storedImgNum")+'.jpg) center center',
                '-webkit-filter': 'blur(5px)',
                backgroundSize: 'cover'
            });

            if((!(todayDate == localStorage.getItem("storedDate")))||(typeof localStorage.getItem("storedDate") === 'undefined')||(localStorage.getItem("storedDate") === null)){
                
                imageNumber();
                function imageNumber(){
                    var newImg = Math.floor((Math.random() * 53) + 1);
                    //console.log('hi'+newImg);
                    if(newImg == localStorage.getItem("storedImgNum")){
                        //console.log('calling again');
                        imageNumber();    
                    }else{
                        $('.imageWrapper').css({
                            background:'url(images/'+localStorage.getItem("storedImgNum")+'.jpg) center center',
                            '-webkit-filter': 'blur(5px)',
                            backgroundSize: 'cover'
                        });
                        /*$('<img/>').attr('src', 'images/'+newImg+'.jpg').load(function() {
                           $(this).remove(); // prevent memory leaks as @benweet suggested
                            $('.container').css({
                                background:'url(images'+newImg+'.jpg) center center',
                                filter: 'blur(20px)',
                                backgroundSize: 'cover'
                            });
                        });*/
                        //console.log('hi');
                        localStorage.setItem("storedDate", todayDate);
                        if(!(localStorage.getItem("storedImgNumTomorrow") === null)){
                            localStorage.setItem("storedImgNum", localStorage.getItem("storedImgNumTomorrow"));    
                        }
                        localStorage.setItem("storedImgNumTomorrow", newImg);
                    }

                }
            }

            $('.hiddenImg').attr('src', 'https://s3-us-west-2.amazonaws.com/chrometab/'+localStorage.getItem("storedImgNum")+'.jpg').load(function() {
                $(this).remove(); // prevent memory leaks as @benweet suggested
                $('.imageWrapper').css({
                    background:'url(https://s3-us-west-2.amazonaws.com/chrometab/'+localStorage.getItem("storedImgNum")+'.jpg) center center',
                    backgroundSize: 'cover'
                });
                $('.imageWrapper').addClass('animateBlur');
            });
            $('.tomHiddienImg').attr('src', 'https://s3-us-west-2.amazonaws.com/chrometab/'+localStorage.getItem("storedImgNumTomorrow")+'.jpg')
        }
    }
}

$(window).load(function(){
    $('.perspective').animate({
        opacity:1
    },300);

    /*$('.container').css({
        '-webkit-filter': 'blur(0px)'
    });*/
})
$(document).ready(function () {
    chromeNewTab.init();
    
    $( "#showMenu" ).hover(
      function() {
        $('.container').addClass('hover');
      }
    );
});