(function(){
    date();
    window.onload = function(){date()}, setInterval(function(){date()}, 1000);

    function date() {
        var now = new Date();
        var hour = now.getHours();
        var ampm = hour >= 12 ? 'pm' : 'am';
        hour = ((hour + 11) % 12 + 1);
        time = ((hour<10?'0':'') + hour)+':'+((now.getMinutes()<10?'0':'') + now.getMinutes()+'<sup>'+ampm+'</sup>');
        $('#dateTime .time').html(time);
    }  
})();