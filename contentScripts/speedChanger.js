(function () {
    // get every element with a video tag on the page and set its playback speed
    const changeSpeed = (speed) => {
        const videoPlayerList = document.getElementsByTagName('video');
        if (videoPlayerList.length === 0) {
            console.error('no video player found');
            return;
        }
        for (const videoPlayer of videoPlayerList) {
            try {
                videoPlayer.playbackRate = speed;
            } catch (err) {
                console.error('failed to set the playback rate on a video player', err);
            }
        }
    }

    // listen for changeSpeed events. once triggered, call the changeSpeed function
    browser.runtime.onMessage.addListener((message) => {
        if (message.command === 'changeSpeed') {
            changeSpeed(message.speed);
        }
    });
})();