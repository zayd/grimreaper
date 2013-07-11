
// Get background scope
var background = chrome.extension.getBackgroundPage();

document.getElementById('timeText').value = background.KILL_TIME;
document.getElementById('timeSlider').value = background.KILL_TIME;

document.getElementById('timeSlider').onchange = function ()
{ document.getElementById('timeText').value = document.getElementById('timeSlider').value
  background.KILL_TIME = document.getElementById('timeSlider').value;
};
