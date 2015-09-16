"use strict";
(function(){
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
})();