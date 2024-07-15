//CHANGE VERSION BEFORE NEW RELEASE
if(document.location.pathname.indexOf('/en/latest') === 0) {
    document.querySelector('.rst-current-version').innerHTML = document.querySelector('.rst-current-version').innerHTML.replace('v: latest', 'v: latest (18.22)')
}

if(document.querySelector('.injected')){
    document.querySelector('.injected > dl:nth-child(1) > dd:nth-child(2) > a').innerText = 'latest (18.22)';
} else {
    let observer = new MutationObserver(() => {
        if (document.querySelector('.injected')) {
            document.querySelector('.injected > dl:nth-child(1) > dd:nth-child(2) > a').innerText = 'latest (18.22)';
            observer.disconnect();
        }
    });
    observer.observe(document.querySelector('.rst-versions.lower-menu'), {childList : true, subtree: true});
}
