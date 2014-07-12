$(document).ready(function () {

    $.ajax({
        url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D2295412&format=json&diagnostics=true&callback=',
        dataType: 'json',
        success: function (data) {
            //console.log(data.feed.entries);
            //alert(data.weather[0]["description"]);
            //alert(data.query.results.channel.item.condition.temp);
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
            $('.weather .tempImg').html("<img alt='"+ wText +"' src='images/plain_weather/flat_white/svg/"+weatherImg+".svg'>");
            // $('.weather .tempImg').html("<img alt='"+ wText +"' src='images/plain_weather/light/svg/"+weatherImg+".svg'>");
            $(data.query.results.channel.item.forecast).each(function (index, forecasts) {
                console.log(index);
                var celsiusH = (forecasts.high-32)*5/9;
                var celsiusHRound = Math.round( celsiusH * 1 ) / 1 + "°";
                var celsiusL = (forecasts.low-32)*5/9;
                var celsiusLRound = Math.round( celsiusL * 1 ) / 1 + "°";
                var itemHtml = '<li class="condition wc-showers"><span class="name">'+forecasts.day+'</span><span class="tempIcon"><img alt="Mostly Cloudy" src="images/plain_weather/flat_white/svg/'+forecasts.code+'.svg"></span><span class="temperature"><span class="hi-c">'+celsiusHRound+'</span><span class="lo-c">'+celsiusLRound+'</span></span><div class="clear"></div></li>'
                //var item_html = '<li class="col-md-6"><div class="flip-container" ontouchstart="this.classList.toggle("hover");"><div class="flipper"><div class="front"><div class="panel panel-success"><div class="panel-heading"><h3 class="panel-title"><a target="_blank" href="' + entry.link + '">' + entry.title + '</a></h3>  </div><div class="panel-body">'+ entry.contentSnippet +'</div></div></div><div class="back detailNews">'+ entry.content +'</div></div></div></li>';
                //var item_html = '<li class="col-md-4"><div class="flip-container" ontouchstart="this.classList.toggle("hover");"><div class="flipper"><div class="front" style="background:url(images/WindowsLogo.jpg)"><h3 class="panel-title"><a target="_blank" href="' + entry.link + '">' + entry.title + '</a></h3></div><div class="back">'+ entry.contentSnippet +'</div></div></div></li>';
                // var item_html = '<li class="col-md-6"><div class="panel panel-success"><div class="panel-heading"><h3 class="panel-title"><a target="_blank" href="' + entry.link + '">' + entry.title + '</a></h3>  </div>  <div class="panel-body">'+ entry.contentSnippet +'</div></div></li>';
                //var item_html = '<li class="col-md-4"><a target="_blank" href="' + entry.link + '">' + entry.contentSnippet + '</a></li>';
                $('ul.forecast').append(itemHtml);
            });
        },
        error: function () {}

    });
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
    /*$.getJSON('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D2295412&format=json&diagnostics=true&callback=', function(data) {
      console.log( data );
      alert(data.query.count);
      alert(data.query.results.channel.item.condition.temp);
    });*/
  $('.detailNews').find('font').remove();

    window.onload = function(){date()}, setInterval(function(){date()}, 1000);

    function date() {
        var now = new Date(),
            now = now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
        $('#time').html(now);
    }

  });