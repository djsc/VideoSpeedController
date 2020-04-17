// listen for clicks on the popup. if a speed button was pressed, send a
// setSpeed message to the content script
document.addEventListener('click', (e) => {
    // try to get the current tab
    browser.tabs.query({ active: true, currentWindow: true })
    .then(tabs => {
        if (tabs.length === 0) {
            throw new Error('no tabs found');
        }
        const currentTabId = tabs[0].id;
        if (e.target.classList.contains('set')) {
            // check the data-speed attribute in popup.html to get the desired speed
            const speed = e.target.getAttribute('data-speed');
            // send a setSpeed message to the current tab
            browser.tabs.sendMessage(currentTabId, {
                command: 'setSpeed',
                speed
            });
            // close the popup
            window.close()
        } else if (e.target.classList.contains('increase')) {
            browser.tabs.sendMessage(currentTabId, {
                command: 'increaseSpeed'
            });
        } else if (e.target.classList.contains('decrease')) {
            browser.tabs.sendMessage(currentTabId, {
                command: 'decreaseSpeed'
            });
        }
    })
    .catch(err => {
        console.error('could not query tabs', err)
    });
});