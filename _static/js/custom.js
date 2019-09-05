(function () {
    // window.onload = function () {
    //     var isApiPresent = document.getElementsByTagName('redoc').length;
    //     if(isApiPresent) {
    //         window.addEventListener("hashchange", function(){
    //                 var elementToScroll = document.querySelector('[href="'+ location.hash +'"]');
    //                 elementToScroll.scrollIntoView();
    //         }, false);
    //     }
    // }

    //Hack to fix issue PPTECHDOC-54
    //RTD is building docs differently since ~ 22-03-2019
    //Without it custom.css is introduced before theme.css and is overwritten
    var style = document.querySelector('link[href$="/custom.css"]');
    var head = document.querySelector('head');
    head.appendChild(style.cloneNode());
})();
