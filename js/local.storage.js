(function(localVar){
    var retrievedObject = localStorage.getItem('localStored');
    localVar.lStored = JSON.parse(retrievedObject);
})(this);



(function(globalVar){
    var stored = {
        currentCity : '',
        currentCountry : '',
        currentWoeid : '',
        currentInfo : [],
        fahrenheit : '',
        weatherImg : '',
        celsius : '',
        celsiusRound : '',
        fahrenheitRound : '',
        wText : '',
        celsiusForecasts : [],
        fahrenheitForecasts : []
    }
    globalVar.stored = stored;
})(this);