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
                    command: 'defaultSpeed'
                });
            } else if (command === "video-speed-up") {
                browser.tabs.sendMessage(currentTabId, {
                    command: 'increaseSpeed'
                });
            } else if (command === "skip-back") {
                browser.tabs.sendMessage(currentTabId, {
                    command: 'scrubBack'
                });
            } else if (command === "play-toggle") {
                browser.tabs.sendMessage(currentTabId, {
                    command: 'playToggle'
                });
            } else if (command === "skip-forward") {
                browser.tabs.sendMessage(currentTabId, {
                    command: 'scrubForward'
                });
            }
        })
        .catch(err => {
            console.error('could not query tabs', err)
        });
});
