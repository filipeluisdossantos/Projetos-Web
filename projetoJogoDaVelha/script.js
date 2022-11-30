//Initial Data
let game = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
}
let player = '';
let warning = '';
let playing = false;


reset();
//Events
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item=>{
    item.addEventListener('click', itemClick);
});
//Fuctions

function reset() {
    for(let i in game) {
        game[i] = '';
    }

    warning = '';
    let random  = Math.floor(Math.random() * 2);
    player = (random === 0) ? 'x' : 'o';
    playing = true;

    renderGame();
    renderInfo();
}

function renderGame() {
    for(let i in game) {
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = game[i];
    }

    checkGame();
}

function renderInfo() {
    document.querySelector('.resultado').innerHTML = warning;
    document.querySelector('.vez').innerHTML = player;
}

function itemClick(e) {
    let el = e.target.getAttribute('data-item');
    
    if( playing && game[el] === '') {
        game[el] = player;
        renderGame();
        togglePlayer();
    }
}

function togglePlayer() {
    player = (player === 'x') ? 'o' : 'x';
    renderInfo();
}

function checkGame() {
    if(checkWinner('x')) {
        warning = '"X" venceu.';
        playing = false;
    } else if(checkWinner('o')) {
        warning = '"O" venceu.';
        playing = false;
    } else if (isFull()) {
        warning = 'Deu empate.';
        playing = false;
    }
}

function checkWinner(player) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'c1,b2,a3',
        'a1,b2,c3'
    ];

    for(let i in pos) {
        pArray = pos[i].split(',');
        let winner = pArray.every(option=>game[option] === player);
        if(winner) {
            return true;
        }
    }

    return false;
}

function isFull() {
    for(let i in game) {
        if(game[i] === '') {
            return false;
        }
    }

    return true;
}