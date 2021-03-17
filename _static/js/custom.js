(function () {
    //Hack to fix issue PPTECHDOC-54
    //RTD is building docs differently since ~ 22-03-2019
    //Without it custom.css is introduced before theme.css and is overwritten
    var style = document.querySelector('link[href$="/custom_1615970464564.css"]');
    var head = document.querySelector('head');
    var detectedUnicorn = function () {
        let element = document.createElement('div');
        element.className = 'unicorn-found';
        element.textContent = 'Your browser is using an ad blocker that affects the UI of this website. Turn it off or add this website to the whitelist.';
        let injectTo = document.querySelectorAll('.wy-nav-content');
        if(injectTo.length === 1) {
            injectTo[0].parentElement.insertBefore(element, injectTo[0]);
        }
    };
    head.appendChild(style.cloneNode());
    if(typeof window.detectionOfStuff !== 'undefined' && typeof unicornDetector !== 'undefined') {
        window.unicornDetector.onDetected(detectedUnicorn);
    }
})();
