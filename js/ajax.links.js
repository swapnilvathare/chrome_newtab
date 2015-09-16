(function(ajaxLinks){
    ajaxLinks.url = {
        city: function(latlon){
            return 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20geo.placefinder%20where%20text%3D"'+latlon+'%22%20and%20gflags%3D%22R%22&format=json&diagnostics=true&callback=';
        },
        weather: function(woeid){
            return 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D'+woeid+'&format=json&diagnostics=true&callback='
        }
    }
})(this);