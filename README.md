# VideoSpeedController
A Firefox browser extension that provides a toolbar menu and keyboard shortcuts for HTML 5 video speed/time manipulation. It is capable of setting speeds beyond those available from the video menu and makes the process of changing speeds much faster. The menu buttons and keyboard shortcuts will work for all videos on the page, whether they are focused or not.

NOTE: this extension currently doesn't work for videos in IFrames.

## Installation

To install the plugin in Firefox, do one of the following:

1. Download the code and temporarily load the plugin in Firefox via about:debugging#/runtime/this-firefox. This will work for the current session only.
2. Open the xpi file distribured in the 'Releases' section 
3. Create and open your own self distributed xpi file via Firefox's Add-on Developer Hub.

## Usage
Once installed, a new icon will appear in Firefox's toolbar. Clicking this icon will open a popup that allows you to increment/decrement/set speed for all HTML 5 videos on the current tab. You can also use keyboard shortcuts change speed/time position.

## Keyboard shortcuts

* Decrement speed by 0.25: Alt+Shift+Z
* Return to normal speed: Alt+Shift+X
* Increment speed by 0.25: Alt+Shift+C
* Go back 5 seconds: Alt+Shift+A
* Pause/Play toggle: Alt+Shift+Q
* Go forward 5 seconds: Alt+Shift+D