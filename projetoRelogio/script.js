let digitalElement = document.querySelector('.digital');
let secondPointer = document.querySelector('.p_s');
let minutePointer = document.querySelector('.p_m');
let hourPointer = document.querySelector('.p_h');

function updateClock(){
    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();

    digitalElement.innerHTML = `${fixZero(hours)}:${fixZero(minutes)}:${fixZero(seconds)}`;

    let hDeg = ((360 / 12) * hours -90) + (0.5 * minutes);
    let mDeg = (360 / 60) * minutes -90;
    let sDeg = (360 / 60) * seconds -90;

    hourPointer.style.transform = `rotate(${hDeg}deg)`;
    minutePointer.style.transform = `rotate(${mDeg}deg)`;
    secondPointer.style.transform = `rotate(${sDeg}deg)`;
}

function fixZero(t) {
    if(t < 10) {
        return `0${t}`;
    } else {
        return t;
    }
}

updateClock();
setInterval(updateClock,1000);