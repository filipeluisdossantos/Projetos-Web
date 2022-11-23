document.body.addEventListener('keyup',(e)=>{
    playSound(e.code.toLowerCase());
});
document.querySelector('.composer button').addEventListener('click',()=>{
    let keyInput = document.querySelector('#input').value;

    if(keyInput !== '') {
        let keyInputArray = keyInput.split('');
        composeMusic(keyInputArray);
    }
});

function playSound(code) {
    let audioElement = document.querySelector(`#s_${code}`);
    let keyElement = document.querySelector(`div[data-key="${code}"]`);

    if(audioElement) {
        audioElement.currentTime = 0;
        audioElement.play();
        keyElement.classList.add('active');
        setTimeout(()=>{
            keyElement.classList.remove('active');
        },300);
    }
}

function composeMusic(keyInputArray) {
    let time = 0;

    for(let KeyItem of keyInputArray) {
        setTimeout(()=>{
            playSound(`key${KeyItem}`);
        },time);

        time += 250;
    }
}