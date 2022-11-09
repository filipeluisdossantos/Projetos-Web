let seuVotoPara = document.querySelector('.d-1 span');
let cargo = document.querySelector('.d-2 span');
let descricao = document.querySelector('.d-4');
let aviso = document.querySelector('.divisao-2');
let lateral = document.querySelector('.divisao-1-right');
let numeros = document.querySelector('.d-3');

let etapaAtual = 0;
let numeroDigitado = '';
let votoNulo = false;
let votoBranco = false;
let candidatoValido = false;
let votos = [];

function comecarEtapa() {
    let etapa = etapas[etapaAtual];
    let numeroHtml = '';
    numeroDigitado = '';
    votoBranco = false;
    votoNulo = false;
    candidatoValido = false;

    for(let i=0; i<etapa.numeros;i++) {
        if(i === 0) {
            numeroHtml = '<div class="numero pisca"></div>'
        } else {
            numeroHtml += '<div class="numero"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numeroDigitado) {
            return true;
        } else {
            return false;
        }
    });
    
    if(candidato.length > 0) {
        candidatoValido = true;

        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;
        aviso.style.display = 'block';

        let fotosHtml = '';

        for(let i in candidato.fotos) {
            if(candidato.fotos[i].small) {
                fotosHtml += `<div class="divisao-1-imagem small"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            } else {
                fotosHtml += `<div class="divisao-1-imagem"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            }
            
        }

        lateral.innerHTML = fotosHtml;
    } else {
        votoNulo = true;
        seuVotoPara.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
        aviso.style.display = 'block';
        lateral.innerHTML = '';
    }

}

function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero !== null) {
        elNumero.innerHTML = n;
        numeroDigitado = `${numeroDigitado}${n}`;

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
        
    }
}
function branco() {
    numeroDigitado = '';
    votoBranco = true;
        
    seuVotoPara.style.display = 'block';
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
    aviso.style.display = 'block';
    lateral.innerHTML = '';
    numeros.innerHTML = '';
}
function corrige() {
    comecarEtapa();
}
function confirma() {
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if(votoBranco === true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapa.titulo,
            voto: 'branco'
        });
    } else if (votoNulo === true){
        votoConfirmado = true;
        votos.push({
            etapa: etapa.titulo,
            voto: 'nulo'
        });
    } else if(candidatoValido === true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapa.titulo,
            voto: numeroDigitado
        });
    }

    if(votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>';
            console.log(votos);
        }
    }
}

comecarEtapa();