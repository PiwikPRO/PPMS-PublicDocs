(function () {
    window.onload = function () {
        var isApiPresent = document.getElementsByTagName('redoc').length;
        if(isApiPresent) {
            window.addEventListener("hashchange", function(){
                var locationHash = location.hash.split('#')[1],
                    elementToScroll = null;
                if(locationHash.split('/')[0] !== 'section'&& locationHash.split('/')[0] !== 'tag' ) {
                    elementToScroll = document.querySelector('[href="'+ location.hash +'"]');
                }
                if(elementToScroll){
                    elementToScroll.scrollIntoView();
                }
            }, false);
        }
    }
})();