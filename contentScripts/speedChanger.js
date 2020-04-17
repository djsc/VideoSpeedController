const SPEED_INCREMENT = 0.25; // amount to increase/decrease speed by
const MIN_SPEED = SPEED_INCREMENT; // don't let the speed get down to 0
const SCRUB_SECONDS = 5; // amount of time to scrub forwards/backwards

// set the playback speed for every video on the page
const setSpeed = (videoPlayerList, speed) => {
    for (const videoPlayer of videoPlayerList) {
        try {
            videoPlayer.playbackRate = speed;
            console.log(`new playback rate = ${speed}`);
        } catch (err) {
            console.error('failed to set the playback rate on a video player', err);
        }
    }
}

// change the playback speed by the given amount for every video on the page. only references the speed of the first video
const changeSpeed = (videoPlayerList, speedOffset) => {
    const firstVideoSpeed = videoPlayerList && videoPlayerList.length > 0 ? videoPlayerList[0].playbackRate : 1.0;
    const newSpeed = Math.max(firstVideoSpeed + speedOffset, MIN_SPEED)
    for (const videoPlayer of videoPlayerList) {
        try {
            videoPlayer.playbackRate = newSpeed
            console.log(`new playback rate = ${newSpeed}`);
        } catch (err) {
            console.error('failed to set the playback rate on a video player', err);
        }
    }
}

// change the current time position by the indicated number of seconds for every video on the page
const scrub = (videoPlayerList, timeOffset) => {
    for (const videoPlayer of videoPlayerList) {
        try {
            videoPlayer.currentTime = Math.max(videoPlayer.currentTime + timeOffset, 0);
        } catch (err) {
            console.error('failed to change the current time on a video player', err);
        }
    }
}

// click every video on the page in order to toggle play/pause
const playToggle = (videoPlayerList) => {
    for (const videoPlayer of videoPlayerList) {
        try {
            videoPlayer.click();
        } catch (err) {
            console.error('failed to toggle play/pause on a video player', err);
        }
    }
}

// listen for events and call the relevant function
browser.runtime.onMessage.addListener((message) => {
    const videoPlayerList = document.getElementsByTagName('video');
    if (message.command === 'setSpeed') {
        setSpeed(videoPlayerList, message.speed);
    } else if (message.command === 'defaultSpeed') {
        setSpeed(videoPlayerList, 1.0);
    } else if (message.command === 'decreaseSpeed') {
        changeSpeed(videoPlayerList, -SPEED_INCREMENT);
    } else  if (message.command === 'increaseSpeed') {
        changeSpeed(videoPlayerList, SPEED_INCREMENT);
    } else  if (message.command === 'scrubBack') {
        scrub(videoPlayerList, -SCRUB_SECONDS);
    } else  if (message.command === 'playToggle') {
        playToggle(videoPlayerList);
    } else  if (message.command === 'scrubForward') {
        scrub(videoPlayerList, SCRUB_SECONDS);
    }
});