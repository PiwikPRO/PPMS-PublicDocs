//CHANGE VERSION BEFORE NEW RELEASE
if(document.location.pathname.indexOf('/en/latest') === 0) {
    document.querySelector('.rst-current-version').innerHTML = document.querySelector('.rst-current-version').innerHTML.replace('v: latest', 'v: latest (16.15)')
}

if(document.querySelector('.injected')){
    document.querySelector('.injected > dl:nth-child(1) > dd:nth-child(2) > a').innerText = 'latest (16.15)';
} else {
    let observer = new MutationObserver(() => {
        if (document.querySelector('.injected')) {
            document.querySelector('.injected > dl:nth-child(1) > dd:nth-child(2) > a').innerText = 'latest (16.15)';
            observer.disconnect();
        }
    });
    observer.observe(document.querySelector('.rst-versions.lower-menu'), {childList : true, subtree: true});
}