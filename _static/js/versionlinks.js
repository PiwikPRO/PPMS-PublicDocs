//CHANGE VERSION BEFORE NEW RELEASE
if(document.location.pathname.indexOf('/en/latest') === 0) {
    document.querySelector('.rst-current-version').innerHTML = document.querySelector('.rst-current-version').innerHTML.replace('v: latest', 'v: latest (17.3)')
}

if(document.querySelector('.injected')){
    document.querySelector('.injected > dl:nth-child(1) > dd:nth-child(2) > a').innerText = 'latest (17.3)';
} else {
    let observer = new MutationObserver(() => {
        if (document.querySelector('.injected')) {
            document.querySelector('.injected > dl:nth-child(1) > dd:nth-child(2) > a').innerText = 'latest (17.3)';
            observer.disconnect();
        }
    });
    observer.observe(document.querySelector('.rst-versions.lower-menu'), {childList : true, subtree: true});
}