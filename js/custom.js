var chromeNewTab = {
    init:function(){
        //this.sections.latoFont();
        this.sections.getCurrentWeather();
        //this.sections.weather();
        this.sections.googleSearch();
        this.sections.currentTime();
        this.sections.mainMenu();
        this.sections.changeBackground();

    },


    sections: {
        //font
/*        latoFont: function(){
            WebFontConfig = {
                google: { families: [ 'Lato::latin' ] }
              };
              (function() {
                var wf = document.createElement('script');
                wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
                  '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
                wf.type = 'text/javascript';
                wf.async = 'true';
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(wf, s);
              })(); 
          },*/

        //Weather
        getCurrentWeather: function(){
            getLocation();
            var currentInfo;
            function getLocation() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showPosition,showError);
                } else {
                    //console.log("Geolocation is not supported by this browser.");
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
                        var currentWoeid = data.query.results.Result.woeid;

                        //console.log(currentCity+" "+currentWoeid);
                        currentInfo = [currentCity, currentWoeid];
                        //console.log(currentInfo);
                        //chromeNewTab.sections.weather();
                        weather();
                       
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
                        var wText = data.query.results.channel.item.condition.text
                        //var wText = data.query.results.channel.item.description
                        //console.log(celsiusRound);
                        $('.weather .type').html(wText+'<br>'+currentInfo[0]);
                        //$('.weather .type').html(data.query.results.channel.item.description);
                        $('.weather .temp').html(celsiusRound);
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
                                //console.log(index);
                                var celsiusH = (forecasts.high-32)*5/9;
                                var celsiusHRound = Math.round( celsiusH * 1 ) / 1 + "°";
                                var celsiusL = (forecasts.low-32)*5/9;
                                var celsiusLRound = Math.round( celsiusL * 1 ) / 1 + "°";
                                var itemHtml = '<li class="condition wc-showers"><span class="name">'+forecasts.day+'</span><span class="tempIcon"><img alt="Mostly Cloudy" src="images/plain_weather/flat_white/png/'+forecasts.code+'.png"></span><span class="temperature"><span class="hi-c">'+celsiusHRound+'</span><span class="lo-c">'+celsiusLRound+'</span></span><div class="clear"></div></li>'
                                $('ul.forecast').append(itemHtml);
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


        //Search
        googleSearch: function(){
            $('.search').click(function(){
                var searchText = $('.searchField').val();
                //console.log(searchText);
                if(!(searchText="")){
                    var searchText = $('.searchField').val();
                    console.log(searchText);
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

                
                $('#dateTime .time').html(time);

                //var d = new Date();
                var weekday = new Array(7);
                weekday[0] = "Sunday";
                weekday[1] = "Monday";
                weekday[2] = "Tuesday";
                weekday[3] = "Wednesday";
                weekday[4] = "Thursday";
                weekday[5] = "Friday";
                weekday[6] = "Saturday";
                var day = weekday[now.getDay()];

                var month = new Array();
                month[0] = "January";
                month[1] = "February";
                month[2] = "March";
                month[3] = "April";
                month[4] = "May";
                month[5] = "June";
                month[6] = "July";
                month[7] = "August";
                month[8] = "September";
                month[9] = "October";
                month[10] = "November";
                month[11] = "December";
                var month = month[now.getMonth()];
                var date = now.getDate();
                //console.log(day+" "+month);
                $('#dateTime .date').html('<span>'+day+", "+date+" "+month+"</span>");
                var dateTimeWidth = $('#dateTime').width()/2;
                //console.log(dateTimeWidth);
                $('#dateTime').css({'margin-left': -dateTimeWidth})
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
            //var storedDate = 'swap';
            //console.log(localStorage.getItem("storedDate"));
            //localStorage.setItem("storedDate", '5');
            /*if((typeof localStorage.getItem("storedDate") === 'undefined')||(localStorage.getItem("storedDate") === null)){
            // if(localStorage.getItem("storedDate") === null){
                //console.log('date is undefined');
                localStorage.setItem("storedDate", todayDate);
                localStorage.setItem("storedImgNum", 1);
            }else{*/
                //console.log('I am in else')
                if((!(todayDate == localStorage.getItem("storedDate")))||(typeof localStorage.getItem("storedDate") === 'undefined')||(localStorage.getItem("storedDate") === null)){
                    if(todayDate == 9){
                        //console.log('today is 5');
                        $('.container').css({
                            background:'url(images/ganesh.jpg) center center',
                            backgroundSize: 'cover'
                        });
                        $('#dateTime').css({
                            left: '75%'
                        });
                        $('.searchWrapper').css({
                            position: 'relative',
                            left: '-258px',
                            marginLeft: '75%'
                        });
                        localStorage.setItem("storedDate", todayDate);
                        //localStorage.setItem("storedImgNum", newImg);
                    }else{
                        imageNumber();
                        function imageNumber(){
                            var newImg = Math.floor((Math.random() * 28) + 1);
                            //console.log('hi'+newImg);
                            if(newImg == localStorage.getItem("storedImgNum")){
                                //console.log('calling again');
                                imageNumber();    
                            }else{

                                //console.log('hi');
                                $('.container').css({
                                    background:'url(images/'+newImg+'.jpg) center center',
                                    backgroundSize: 'cover'
                                });
                                localStorage.setItem("storedDate", todayDate);
                                localStorage.setItem("storedImgNum", newImg);
                            }

                        }
                    }
                }else{

                    //console.log('else hi');
                    if(todayDate == 9){
                        //console.log('today is 5 again');
                        $('.container').css({
                            background:'url(images/ganesh.jpg) center center',
                            backgroundSize: 'cover'
                        });
                        $('#dateTime').css({
                            left: '75%'
                        });
                        $('.searchWrapper').css({
                            position: 'relative',
                            left: '-258px',
                            marginLeft: '75%'
                        });
                        //localStorage.setItem("storedImgNum", newImg);
                    }else{
                        $('.container').css({
                            background:'url(images/'+localStorage.getItem("storedImgNum")+'.jpg) center center',
                            backgroundSize: 'cover'
                        })
                    }   
                }
            /*}*/
            //if(todayDate == )
            //console.log(storedDate);

        }
    }
}

$(window).load(function(){
    $('.perspective').animate({
        opacity:1
    },300)
})
$(document).ready(function () {
    $('.perspective').css({
        opacity:0
    });
    $( "#showMenu" ).hover(
      function() {
        $('.container').addClass('hover');
      }
    );
    //$(".searchField").focus();
    chromeNewTab.init();
});