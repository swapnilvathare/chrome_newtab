(function(){
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
})();