
let seuVotoPara = document.querySelector('.seuvotopara span');
let cargo = document.querySelector('.cargo span');
let digito = document.querySelector('.numeros');
let descricao = document.querySelector('.descricao');
let aviso = document.querySelector('.divisao-2');
let lateral = document.querySelector('.divisao-1-right');

let numeroDigitado = '';
let etapaAtual = 0;
let votoNulo = false;
let votoBranco = false;
let votos = [];


function comecarEtapa() {
    let etapa = etapas[etapaAtual];
    let numeroHtml ='';
    numeroDigitado = '';
    votoNulo = false;
    votoBranco= false;

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';

    for(let i=0; i < etapa.numeros; i++) {
        if(i == 0) {
            numeroHtml = `<div class="digito pisca"></div>`;
        } else {
            numeroHtml += `<div class="digito"></div>`
        }
    }
    digito.innerHTML = `Número: ${numeroHtml}`;
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero == numeroDigitado) {
            return true;
        } else {
            return false;
        }
    });
    if(candidato.length > 0) {
        candidato = candidato[0];
        
        seuVotoPara.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}<br/>`;
        aviso.style.display = 'block';

        let fotosHtml = '';
        for(let i in candidato.fotos) {
            if(candidato.fotos[i].small) {
                fotosHtml += `<div class="imagem-candidato small"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            } else {
                fotosHtml += `<div class="imagem-candidato"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            }
        }

        lateral.innerHTML = fotosHtml;

    } else {
        votoNulo = true;
        seuVotoPara.style.display = 'block';
        descricao.innerHTML ='<div class="aviso-grande pisca">VOTO NULO</div>';
        aviso.style.display = 'block';
    }
}

function clicou(n) {
    let numero = document.querySelector('.digito.pisca');
    if(numero !== null) {
        numero.innerHTML = n;
        numeroDigitado = `${numeroDigitado}${n}`;
        numero.classList.remove('pisca');
        if(numero.nextElementSibling !== null) {
            numero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
      
    }
}
function branco() {
    votoBranco = true;
    
    seuVotoPara.style.display = 'block';
    digito.innerHTML = '';
    descricao.innerHTML ='<div class="aviso-grande pisca">VOTO EM BRANCO</div>';
    aviso.style.display = 'block';
    lateral.innerHTML = '';
}
function corrige() {
    comecarEtapa();
}
function confirma() {
    let votoConfirmado = false;
    if(votoBranco == true) {
        votoConfirmado= true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    } else if(votoNulo == true) {
        votoConfirmado= true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'nulo'
        });
    } else {
        votoConfirmado= true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numeroDigitado
        })
    }
    if(votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso-gigante pisca">FIM</div>';
            console.log(votos);
        }
    }
    
}

comecarEtapa();
