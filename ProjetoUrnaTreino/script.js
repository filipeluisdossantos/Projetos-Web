let seuVotoPara = document.querySelector('.seu-voto-para span');
let cargo = document.querySelector('.cargo span');
let numeros = document.querySelector('.numeros-area');
let descricao = document.querySelector('.desc-candidato');
let aviso = document.querySelector('.divisao-2');
let lateralFoto = document.querySelector('.divisao-1-right');

let etapaAtual = 0;
let numero = '';

function comecarEtapa() {
    let etapa = etapas[etapaAtual];
    let numeroHtml = '';

    for(let i=0; i < etapa.numeros;i++){
        if(i ==0) {
            numeroHtml = '<div class="numero pisca"></div>';
        } else {
            numeroHtml += '<div class="numero"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateralFoto.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}
function atualizaInterface() {
    alert('finalizaou o voto');
}


function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero != null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero. classList.remove('pisca');
        if(elNumero.nextElementSibling != null) {
            elNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
        
    }
}
function branco() {
    alert('branco');
}
function corrige() {
    alert('corrige');
}
function confirma() {
    alert('confirma');
}

comecarEtapa();