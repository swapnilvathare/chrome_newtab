var chromeNewTab = {
    init:function(){
        this.sections.weather();
        this.sections.googleSearch();
        this.sections.currentTime();
        this.sections.mainMenu();
        this.sections.changeBackground();

    },

    sections: {

        //Weather
        weather: function(){
            $('.weather .tempImg').html(localStorage.getItem("tempImg"));
            $('.weather .temp').html(localStorage.getItem("temp"));
            $('.weather .type').html(localStorage.getItem("wType"));
            $('ul.forecast').html(localStorage.getItem("sForcast"));
            $.ajax({
                url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D2295412&format=json&diagnostics=true&callback=',
                dataType: 'json',
                success: function (data) {
                    var fahrenheit = data.query.results.channel.item.condition.temp;
                    var weatherImg = data.query.results.channel.item.condition.code;
                    var celsius = (fahrenheit-32)*5/9;
                    var celsiusRound = Math.round( celsius * 1 ) / 1 + "°C";
                    var wText = data.query.results.channel.item.condition.text
                    //var wText = data.query.results.channel.item.description
                    console.log(celsiusRound);
                    $('.weather .type').html(wText);
                    //$('.weather .type').html(data.query.results.channel.item.description);
                    $('.weather .temp').html(celsiusRound);
                    $('.weather .tempImg').html("<img alt='"+ wText +"' src='images/plain_weather/flat_white/png/"+weatherImg+".png'>");

                    localStorage.removeItem("tempImg");
                    localStorage.removeItem("temp");
                    localStorage.removeItem("wType");
                    localStorage.setItem("tempImg", "<img alt='"+ wText +"' src='images/plain_weather/flat_white/png/"+weatherImg+".png'>");
                    localStorage.setItem("temp", celsiusRound);
                    localStorage.setItem("wType", wText);
                    // $('.weather .tempImg').html("<img alt='"+ wText +"' src='images/plain_weather/light/png/"+weatherImg+".png'>");

                    $('ul.forecast').empty();

                    $(data.query.results.channel.item.forecast).each(function (index, forecasts) {
                        console.log(index);
                        var celsiusH = (forecasts.high-32)*5/9;
                        var celsiusHRound = Math.round( celsiusH * 1 ) / 1 + "°";
                        var celsiusL = (forecasts.low-32)*5/9;
                        var celsiusLRound = Math.round( celsiusL * 1 ) / 1 + "°";
                        var itemHtml = '<li class="condition wc-showers"><span class="name">'+forecasts.day+'</span><span class="tempIcon"><img alt="Mostly Cloudy" src="images/plain_weather/flat_white/png/'+forecasts.code+'.png"></span><span class="temperature"><span class="hi-c">'+celsiusHRound+'</span><span class="lo-c">'+celsiusLRound+'</span></span><div class="clear"></div></li>'
                        
                        $('ul.forecast').append(itemHtml);
                    });
                    var forcast = $('ul.forecast').html();
                    localStorage.removeItem("sForcast");
                    localStorage.setItem("sForcast", forcast);
                },
                error: function () {}
            });
    
        },

        //Search
        googleSearch: function(){
            $('.search').click(function(){
                var searchText = $('.searchField').val();
                console.log(searchText);
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
                    console.log('You pressed enter!');
                    if($(".searchField").is(":focus")){
                        if(!(searchText="")){
                            var searchText = $('.searchField').val();
                            console.log(searchText);
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
                var now = new Date(),
                    now = now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
                $('#time').html(now);
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
                console.log('hi');
            if(typeof localStorage.getItem("storedDate") === 'undefined'){
                localStorage.setItem("storedDate", todayDate);
            }else{
                if(todayDate == localStorage.getItem("storedDate")){
                    imageNumber();
                    function imageNumber(){
                        var newImg = Math.floor((Math.random() * 9) + 1);
                        console.log(newImg);
                        if(newImg == 1){
                            //imageNumber();    
                        }else{

                            console.log('hi');
                            $('.container').css({
                                background:'url(images/'+newImg+'.jpg)',
                                backgroundSize: 'cover'
                            })
                        }

                    }

                }
            }
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
    chromeNewTab.init();
});