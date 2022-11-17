let totalSlides = document.querySelectorAll('.slide-item').length;
let slideAtual = 0;

document.querySelector('.slide-area').style.width = `calc(100vw * ${totalSlides})`;
document.querySelector('.botao-area').style.height = `${document.querySelector('.header-banner').clientHeight}px`;


function voltar() {
    slideAtual--;
    if(slideAtual < 0) {
        slideAtual = totalSlides - 1;
    }
    atualizarMargem();
}


function avancar() {
    slideAtual++;
    if(slideAtual > (totalSlides - 1)) {
        slideAtual = 0;
    }
    atualizarMargem();
}

function atualizarMargem() {
    let slideItemWidth = document.querySelector('.slide-item').clientWidth;
    let newMargem = (slideAtual * slideItemWidth);
    document.querySelector('.slide-area').style.marginLeft = `-${newMargem}px`;
}

setInterval(avancar, 4000);
