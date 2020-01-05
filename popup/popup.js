// listen for clicks on the popup. if a speed button was pressed, send a
// changeSpeed message to the content script
const listenForClicks = () => {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('speedbutton')) {
            // check the data-speed attribute in popup.html to get the desired speed
            const speed = e.target.getAttribute('data-speed');
            // try to get the current tab
            browser.tabs.query({ active: true, currentWindow: true })
                .then(tabs => {
                    // send a changeSpeed message to the current tab
                    browser.tabs.sendMessage(tabs[0].id, {
                        command: 'changeSpeed',
                        speed
                    });
                })
                .catch(err => {
                    console.error('could not query tabs', err)
                });
            // close the popup
            window.close()
        }
    });
}

// show error text instead of the speed buttons if the script fails to load
const handleScriptFailure = () => {
    document.querySelector('#popup-content').classList.add('hidden');
    document.querySelector('#error-content').classList.remove('hidden');
}

// execute the content script and then listen for clicks
browser.tabs.executeScript({ file: '/contentScripts/speedChanger.js' })
    .then(listenForClicks)
    .catch(handleScriptFailure);