let totalSlides =  document.querySelectorAll('.slider-item').length;
let slideAtual = 0;

document.querySelector('.sliders-area').style.width = `calc(100vw * ${totalSlides})`;
document.querySelector('.sliders-controls').style.height = `${document.querySelector('.header-banner').clientHeight}px`;


function voltar() {
    slideAtual--;
    if(slideAtual < 0) {
        slideAtual = totalSlides - 1;
    }
    atualizarMargem();
}

function avancar() {
    slideAtual++;
    if(slideAtual > totalSlides - 1){
        slideAtual = 0;
    }
    atualizarMargem();
}

function atualizarMargem() {
    let slideItemWidth = document.querySelector('.slider-item').clientWidth;
    let newMargin = (slideAtual * slideItemWidth);
    
    document.querySelector('.sliders-area').style.marginLeft = 
    `-${newMargin}px`;
}

setInterval(avancar, 4000);