(function () {
    window.onload = function () {
        var tocList = document.querySelectorAll('.wy-side-scroll p.caption');
        var tocUlList = document.querySelectorAll('.wy-side-scroll ul');
        for (var i = 0; i < tocList.length; i++) {
            tocList[i].addEventListener('click', function(event) {
                for (var i = 0; i < tocList.length; i++) {
                    tocList[i].classList.remove("active-toc");
                }
                event.target.parentElement.classList.add("active-toc");
            });
        }
        for (i = 0; i < tocUlList.length; i++) {
            var current = tocUlList[i];
            if(current.classList.contains('current')) {
                current.previousSibling.previousSibling.classList.add("active-toc");
            }
        }
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