let totalSlides = document.querySelectorAll('.slide-item').length;

document.querySelector('.slide-area').style.width = `calc(100vw * ${totalSlides})`;

var slideAtual = 0;


function voltar() {
    slideAtual--;
    if(slideAtual < 0) {
        slideAtual = totalSlides -1;
    }
    atualizarMargem();
}

function avancar() {
    slideAtual++;
    if(slideAtual > totalSlides -1) {
        slideAtual = 0;
    }
    atualizarMargem();
}

function atualizarMargem() {
    let slideItemWidth = document.querySelector('.slide-item').clientWidth;
    let newMargin = (slideAtual * slideItemWidth);

    document.querySelector('.slide-area').style.marginLeft = `-${newMargin}px`;
}

setInterval(avancar, 5000);