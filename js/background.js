(function(){
    var specialDates = ['16/9/2015','17/9/2015','18/9/2015','19/9/2015','20/9/2015','21/9/2015'];
    var todayDate = new Date();
    todayDate = todayDate.getDate();
    if((localStorage.getItem("storedDate") === null)){
        localStorage.setItem("storedImgNum", 2);    
    }
    //console.log(localStorage.getItem("storedImgNum"));
    $('.imageWrapper').css({
        background:'url(images/'+localStorage.getItem("storedImgNum")+'.jpg) center center',
        '-webkit-filter': 'blur(5px)',
        backgroundSize: 'cover'
    });
    /*console.log(todayDate);
            console.log('hi');
    if(todayDate == 16){
            console.log(localStorage.getItem("callToday"));
        if(localStorage.getItem("callToday")==null){
            console.log('hi3');
            localStorage.setItem("callToday", true);
        }
    }*/
    console.log(lStored.currentCountry);
    if((!(todayDate == localStorage.getItem("storedDate")))||(typeof localStorage.getItem("storedDate") === 'undefined')||(localStorage.getItem("storedDate") === null)||(localStorage.getItem("callToday") === null)){
        localStorage.setItem("callToday", false);
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        var newdate = day + "/" + month + "/" + year;
        var isSpecial = false;
        for (var i = 0; i < specialDates.length; i++) {
            console.log(specialDates[i]);
            //if(!isSpecial){
            if(specialDates[i]==newdate){
                isSpecial = true;
                console.log('this is special');
            }
            //}
        };
        if(isSpecial){
            specialNumber();
        }else{
            imageNumber();
        }
        function imageNumber(){
            var newImg = Math.floor((Math.random() * 53) + 1);
            //console.log('hi'+newImg);
            if(newImg == localStorage.getItem("storedImgNum")){
                //console.log('calling again');
                imageNumber();    
            }else{
                localStorage.setItem("storedDate", todayDate);
                if(!(localStorage.getItem("storedImgNumTomorrow") === null)){
                    localStorage.setItem("storedImgNum", localStorage.getItem("storedImgNumTomorrow"));    
                }
                localStorage.setItem("storedImgNumTomorrow", newImg);
            }

        }

        function specialNumber(){
            var newImg = Math.floor((Math.random() * 53) + 1);
            localStorage.setItem("storedDate", todayDate);
            //if(!(localStorage.getItem("storedImgNumTomorrow") === null)){
                localStorage.setItem("storedImgNum", "special");    
            //}
            localStorage.setItem("storedImgNumTomorrow", newImg);
            

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
})();