let startingMins = .05;
let noti = false;
let timerPaused = false;

readCookies();


let time = startingMins * 60;

const countdownEL = document.getElementById('countdown');

update()
var intervalID = setInterval(update, 1000);

function update(){
    const mins = Math.floor(time/60);
    let seconds = time % 60;

    seconds = seconds<10 ? '0'+seconds: seconds;

    let show = `${mins}:${seconds}`;

    if(time < 0){
        show = "time's up!";
        document.body.style.backgroundColor = 'seagreen';
        if (noti) notifyMe();
        clearInterval(intervalID);
    }
    countdownEL.innerHTML = show
    time--
}

function resetTimer(){
    clearInterval(intervalID);
    time = startingMins * 60;
    update();
    intervalID = setInterval(update, 1000);
    document.body.style.backgroundColor = 'lightcoral';
}

function setTimer(){
    var newtime = prompt('how many minutes?','45')
    setCookie('cStartingMins', newtime, 9999);
    startingMins = parseFloat(newtime);
    resetTimer();
}

function setnoti(){
    noti = !noti;
    // console.log(noti);
    setCookie('cNoti', noti, 9999);
    getCookie('cNoti');
    if(noti == true){
        document.getElementById('notibutt').style.textDecoration = 'none';
        if (Notification.permission !== "denied") {
            Notification.requestPermission()
        }
        // setCookie('cNoti', true, 9999);
    }else{
        document.getElementById('notibutt').style.textDecoration = 'line-through';
        // setCookie('cNoti', false, 9999);
    }
}


function pauseTimer(){
    timerPaused = !timerPaused;
    if(timerPaused){
        clearInterval(intervalID);
        countdownEL.innerHTML = "[paused]";
        document.getElementById('pause').innerText = 'resume';
        document.body.style.backgroundColor = 'sandybrown';
    }else{
        update();
        intervalID = setInterval(update, 1000);
        document.getElementById('pause').innerText = 'pause';
        document.body.style.backgroundColor = 'lightcoral';
    }
}

function readCookies(){
    startingMins = getCookie('cStartingMins') == ""? 25: parseFloat(getCookie('cStartingMins'));
    if(getCookie('cNoti') != ""){
        if(getCookie('cNoti') == 'true' && noti == false) setnoti();
        if(getCookie('cNoti') == 'false' && noti == true) setnoti();
    }
    console.log(getCookie('cNoti'));
}




function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

function checkCookie() {
    var username = getCookie("username");
    if (username != "") {
            alert("Welcome again " + username);
    } else {
        username = prompt("Please enter your name:", "");
        if (username != "" && username != null) {
        setCookie("username", username, 365);
        }
    }
}

function notifyMe() {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
  
    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var notification = new Notification("time's up");
    }
  
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var notification = new Notification("time's up");
        }
      });
    }
  
    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them any more.
}

