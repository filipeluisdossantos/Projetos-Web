let seuVotoPara = document.querySelector('.seuvotopara span');
let cargo = document.querySelector('.cargo span');
let numero = document.querySelector('.numero');
let descricao = document.querySelector('.descricao');
let aviso = document.querySelector('.divisao-2');
let lateral = document.querySelector('.divisao-1-right');


var etapaAtual = 0;
var numeroDigitado = '';
var votoNulo = false;
var votoBranco = false;
var votos = [];


function comecarEtapa() {
    let etapa = etapas[etapaAtual];
    let numeroHtml = '';
    numeroDigitado = '';
    votoNulo = false;
    votoBranco = false;

    for(let i=0; i < etapa.numeros; i++) {
        if(i==0) {
            numeroHtml = '<div class="digito pisca"></div>'
        } else {
            numeroHtml += '<div class="digito"></div>'
        }
    }
    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    numero.innerHTML = `Número: ${numeroHtml}`;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
}

function atualizarInterface() {
    let etapa = etapas[etapaAtual];
    let candidato =  etapa.candidatos.filter((item)=>{
        if(item.numero === numeroDigitado) {
            return true;
        } else {
            return false;
        }
    });
    if(candidato.length > 0) {
        candidato = candidato[0];
        let fotosHtml = '';

        for(let i in candidato.fotos) {
            if(candidato.fotos[i].small) {
                fotosHtml += `<div class="foto-candidato small"><img src="images/${candidato.fotos[i].url}" alt="foto do candidato">${candidato.fotos[i].legenda}</div>`;
                descricao.innerHTML = `<div>Nome: ${candidato.nome}<br>Partido: ${candidato.partido} <br>Vice: ${candidato.vice}</div>`;
            } else {
                fotosHtml += `<div class="foto-candidato"><img src="images/${candidato.fotos[i].url}" alt="foto do candidato">${candidato.fotos[i].legenda}</div>`;
                descricao.innerHTML = `<div>Nome: ${candidato.nome}<br>Partido: ${candidato.partido} <br></div>`;
            }
        }

        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        lateral.innerHTML = fotosHtml;
    } else {
        votoNulo = true;

        seuVotoPara.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
        aviso.style.display = 'block';
    }
}

function clicou(n) {
    let num = document.querySelector('.digito.pisca');
    if(num !== null) {
        num.innerHTML = n;
        numeroDigitado = `${numeroDigitado}${n}`;
        num.classList.remove('pisca');
        if(num.nextElementSibling !== null) {
            num.nextElementSibling.classList.add('pisca');
        } else {
            atualizarInterface();
        }
    }
}

function branco() {
    
    if(numeroDigitado === '') {
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        numero.innerHTML = '';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
        aviso.style.display = 'block';
        lateral.innerHTML = '';
    } else {
        seuVotoPara.style.display = 'none';
        descricao.innerHTML = '<div class="aviso--pequeno pisca">Para Voto em Branco não pode ter digitado números</div>Aperte a Tecla: CORRIGE para REINICIAR novamente';
        aviso.style.display = 'none';
        lateral.innerHTML = '';
    }
    
}

function corrige() {
    comecarEtapa();
}

function confirma() {
    let votoConfirmado = false;
    if(votoBranco == true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    } else if(votoNulo == true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'nulo'
        });
    } else {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numeroDigitado
        });
    }
    if(votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>'
            console.log(votos);
        }  
    }
}

comecarEtapa();