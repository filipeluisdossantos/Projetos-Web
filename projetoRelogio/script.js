let digitalClock = document.querySelector('.digital');
let secondPointer = document.querySelector('.p_s');
let minutePointer = document.querySelector('.p_m');
let hourPointer = document.querySelector('.p_h');


function updateClock() {
    let time = new Date();
    let second = time.getSeconds();
    let minute = time.getMinutes();
    let hour = time.getHours();

    digitalClock.innerHTML = `${fixZero(hour)}:${fixZero(minute)}:${fixZero(second)}`;

    let sDeg = (360 / 60) * second -90;
    let mDeg = (360 / 60) * minute -90;
    let hDeg = ((360 / 12) * hour -90) + ((30 / 60) * minute);
    secondPointer.style.transform = `rotate(${sDeg}deg)`;
    minutePointer.style.transform = `rotate(${mDeg}deg)`;
    hourPointer.style.transform = `rotate(${hDeg}deg)`;
}

function fixZero(t){
    if(t < 10) {
        return `0${t}`;
    } else {
        return t;
    }
}

updateClock();
setInterval(updateClock,1000);