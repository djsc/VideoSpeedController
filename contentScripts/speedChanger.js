const SPEED_INCREMENT = 0.25; // amount to increase/decrease speed by
const MIN_SPEED = 0;
const MAX_SPEED = 100;

// get every element with a video tag on the page and set its playback speed
const changeSpeed = (videoPlayerList, speed) => {
    for (const videoPlayer of videoPlayerList) {
        try {
            videoPlayer.playbackRate = speed;
            console.log(`new playback rate = ${speed}`);
        } catch (err) {
            console.error('failed to set the playback rate on a video player', err);
        }
    }
}

// get every element with a video tag on the page and decrease its playback speed. only references the speed of the first video
const decreaseSpeed = (videoPlayerList) => {
    const firstVideoSpeed = videoPlayerList && videoPlayerList.length > 0 ? videoPlayerList[0].playbackRate : 1.0;
    const newSpeed = Math.max(firstVideoSpeed - SPEED_INCREMENT, MIN_SPEED);
    for (const videoPlayer of videoPlayerList) {
        try {
            videoPlayer.playbackRate = newSpeed
            console.log(`new playback rate = ${newSpeed}`);
        } catch (err) {
            console.error('failed to set the playback rate on a video player', err);
        }
    }
}

// get every element with a video tag on the page and increase its playback speed. only references the speed of the first video
const increaseSpeed = (videoPlayerList) => {
    const firstVideoSpeed = videoPlayerList && videoPlayerList.length > 0 ? videoPlayerList[0].playbackRate : 1.0;
    const newSpeed = Math.min(firstVideoSpeed + SPEED_INCREMENT, MAX_SPEED);
    for (const videoPlayer of videoPlayerList) {
        try {
            videoPlayer.playbackRate = newSpeed;
            console.log(`new playback rate = ${newSpeed}`);
        } catch (err) {
            console.error('failed to set the playback rate on a video player', err);
        }
    }
}

// listen for changeSpeed events. once triggered, call the changeSpeed function
browser.runtime.onMessage.addListener((message) => {
    const videoPlayerList = document.getElementsByTagName('video');
    if (message.command === 'changeSpeed') {
        changeSpeed(videoPlayerList, message.speed);
    } else if (message.command === 'decreaseSpeed') {
        decreaseSpeed(videoPlayerList);
    } else  if (message.command === 'increaseSpeed') {
        increaseSpeed(videoPlayerList);
    }
});