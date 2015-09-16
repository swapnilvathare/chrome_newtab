(function(ajaxCall){
    ajaxCall.fetch = function(url,success){
        var currentUrl = url
        $.ajax({
            url: currentUrl,
            //type: 'default GET (Other values: POST)',
            dataType: 'json',
            success: success
        });
        
    };
})(this);