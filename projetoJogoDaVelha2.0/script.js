//initial Data
let games = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};
let player = '';
let warning = '';
let playing = false;
let input1 = document.querySelector('.jogador1');
let input2 = document.querySelector('.jogador2');
let name1 = '';
let name2 = '';

//Events
document.querySelector('.iniciar').addEventListener('click', start);
document.querySelector('.reiniciar').addEventListener('click', restart);
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', clickedItem);
});
document.querySelector('.novoJogador').addEventListener('click', clearPlayers);

//fuctions

function clickedItem(e) {
    let item = e.target.getAttribute('data-item');

    if(playing && games[item] === '') {
        games[item] = player;
        renderGame();
        togglePlayer();
    }
}

function start() {
    let random = Math.floor(Math.random() * 2);
    player = (random === 0) ? 'x' : 'o';
    
    name1 = input1.value;
    name2 = input2.value;
    restart();
}

function restart() {
    for(let i in games) {
        games[i] = '';
    }
    
    warning = '';
    
    if(name1 && name2 !== '') {
        playing = true;

        let item = document.querySelector('.iniciar');
        item.classList.add('cor');
        item.innerHTML = 'Jogando...';
        renderGame();
        renderInfo();
    } else {
        playing = false;

        let item = document.querySelector('.iniciar');
        item.classList.remove('cor');
        item.innerHTML = 'Iniciar';
        renderGame();
    }
}

function renderGame() {
    for(let i in games) {
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = games[i];
    }  
    checkGame();
}

function renderInfo() {
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}

function togglePlayer() {
    if(winner('x')){
        player = 'x';
    } else if(winner('o')){
        player = 'o';
    } else {
        player = (player === 'x') ? 'o' : 'x';
    }
    
    renderInfo();
}

function checkGame() {
    if(winner('x')) {
        warning = `${name1} Venceu.`;
        playing = false;
    } else if(winner('o')) {
        warning = `${name2} Venceu`;
        playing = false;
    } else if(isfull()) {
        warning = 'Deu empate.';
        playing = false;
    }
}

function winner(player) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];
    for(let i in pos) {
        let pArray = pos[i].split(',');
        let res = pArray.every(option=>games[option] === player);
        if(res) {
            return true;
        }
    }

    return false;
}

function isfull() {
    for(let i in games) {
        if(games[i] === '') {
            return false;
        }
    }

    return true;
}

function clearPlayers() {
    input1.value = '';
    input2.value = '';
    player = '';
    warning = '';
    renderInfo();
    start();
}