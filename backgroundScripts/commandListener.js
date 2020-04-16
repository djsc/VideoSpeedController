browser.commands.onCommand.addListener((command) => {
    // try to get the current tab
    browser.tabs.query({ active: true, currentWindow: true })
        .then(tabs => {
            if (tabs.length === 0) {
                throw new Error('no tabs found');
            }
            const currentTabId = tabs[0].id;
            // send the relevant message to the current tab
            if (command === "video-speed-down") {
                browser.tabs.sendMessage(currentTabId, {
                    command: 'decreaseSpeed'
                });
            } else if (command === "video-speed-default") {
                browser.tabs.sendMessage(currentTabId, {
                    command: 'changeSpeed',
                    speed: 1.0
                });
            } else if (command === "video-speed-up") {
                browser.tabs.sendMessage(currentTabId, {
                    command: 'increaseSpeed'
                });
            }
        })
        .catch(err => {
            console.error('could not query tabs', err)
        });
});
