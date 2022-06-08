(function () {
    //Hack to fix issue PPTECHDOC-54
    //RTD is building docs differently since ~ 22-03-2019
    //Without it custom.css is introduced before theme.css and is overwritten
    let style = document.querySelector('link[href$="/custom_1653024076375.css"]');
    let head = document.querySelector('head');
    let detectedUnicorn = function () {
        let element = document.createElement('div');
        element.className = 'unicorn-found';
        element.textContent = 'Your browser is using an ad blocker that affects the UI of this website. Turn it off or add this website to the whitelist.';
        let injectTo = document.querySelectorAll('.wy-nav-content');
        if(injectTo.length === 1) {
            injectTo[0].parentElement.insertBefore(element, injectTo[0]);
        }
    };
    if(style) {
        head.appendChild(style.cloneNode());
    }
    if(typeof window.detectionOfStuff !== 'undefined' && typeof unicornDetector !== 'undefined') {
        window.unicornDetector.onDetected(detectedUnicorn);
    }

    window.prepareRedocMenu = function () {
        let redocmenu = document.querySelector('#redoc-container [role=navigation]');
        let prependMenu = document.querySelector('.toctree-l3.current');
        let index = 3;
        let isAlreadyExpanded, prependMenuexpand;
        if(!prependMenu){
            prependMenu = document.querySelector('.toctree-l2.current');
            index = 2;
        }
        if(index === 3) {
            prependMenuexpand = document.querySelector('.toctree-l3.current a');
            isAlreadyExpanded = document.querySelector('.toctree-l3.current a .toctree-expand');
        } else {
            prependMenuexpand = document.querySelector('.toctree-l2.current a');
            isAlreadyExpanded = document.querySelector('.toctree-l2.current a .toctree-expand');
        }

        if(!isAlreadyExpanded) {
            prependMenuexpand.innerHTML = '<span class="toctree-expand"> </span>' + prependMenuexpand.innerHTML;
        }
        prependMenu.appendChild(redocmenu);
    }
})();
