(function () {
    window.onload = function () {
        var isApiPresent = document.getElementsByTagName('redoc').length;
        if(isApiPresent) {
            window.addEventListener("hashchange", function(){
                    var elementToScroll = document.querySelector('[href="'+ location.hash +'"]');
                    elementToScroll.scrollIntoView();
            }, false);
        }
    }
})();