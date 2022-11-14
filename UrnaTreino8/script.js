var seuVotoPara = document.querySelector('.seuvotopara span');
var cargo = document.querySelector('.cargo span');
var numeros = document.querySelector('.numeros');
var descricao = document.querySelector('.descricao');
var aviso = document.querySelector('.divisao-2');
var lateral = document.querySelector('.divisao-1-right');

var etapaAtual = 0;
var numeroDigitado = '';
var votoNulo = false;
var votoBranco = false;
var votos = [];

function comecarEtapa() {
    let etapa = etapas[etapaAtual];
    let numerosHtml = '';
    numeroDigitado = '';
    votoNulo = false;
    votoBranco = false;

    for(let i=0; i < etapa.numeros; i++) {
        if(i == 0) {
            numerosHtml = '<div class="digito pisca"></div>';
        } else {
            numerosHtml += '<div class="digito"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    numeros.innerHTML = `<span>Número:</span> ${numerosHtml}`;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
}

function atualizarInterface() {
    let candidato = etapas[etapaAtual].candidatos.filter((item)=>{
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
                fotosHtml += `<div class="foto-candidato small"><img src="assets/images/${candidato.fotos[i].url}" alt="foto-candidato">${candidato.fotos[i].legenda}</div>`;
                descricao.innerHTML = `<span>Nome: ${candidato.nome} <br> Partido: ${candidato.partido} <br>Vice: ${candidato.vice}</span>`;
            } else {
                fotosHtml += `<div class="foto-candidato"><img src="assets/images/${candidato.fotos[i].url}" alt="foto-candidato">${candidato.fotos[i].legenda}</div>`;
                descricao.innerHTML = `<span>Nome: ${candidato.nome} <br> Partido: ${candidato.partido}</span>`;
            }
        }

        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        lateral.innerHTML = fotosHtml;
    } else {
        votoNulo = true;

        seuVotoPara.style.display = 'block';
        descricao.innerHTML = `<div class="aviso--grande pisca">VOTO NULO</div>`;
        aviso.style.display = 'block';
        lateral.innerHTML = '';
    }
}

function clicou(n) {
    let pisca = document.querySelector('.digito.pisca');
    if(pisca !== null) {
        pisca.innerHTML = n;
        numeroDigitado = `${numeroDigitado}${n}`;
        pisca.classList.remove('pisca');
        if(pisca.nextElementSibling) {
            pisca.nextElementSibling.classList.add('pisca');
        } else {
            atualizarInterface();
        }
    }
}


function branco() {
    if(numeroDigitado === '') {
        votoBranco = true;

        seuVotoPara.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = `<div class="aviso--branco pisca">VOTO EM BRANCO</div>`;
        aviso.style.display = 'block';
        lateral.innerHTML = '';
    } else {
        descricao.innerHTML = `<div class="aviso--pequeno pisca">Para voto em BRANCO não pode ser digitado número</div><div class="aviso--pequeno--corrige">Aperte a tecla: <span>CORRIGE</span> para REINICIAR o voto</div>`;
    }
}


function corrige() {
    comecarEtapa();
}

function confirma() {
    let audio = new Audio();
    let votoConfirmado = false;
    if(votoBranco == true) {
        votoConfirmado = true;
        votos.push({
            cargo: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    } else if(votoNulo == true) {
        votoConfirmado = true;
        votos.push({
            cargo: etapas[etapaAtual].titulo,
            voto: 'nulo'
        });
    } else if(numeroDigitado.length == etapas[etapaAtual].numeros ) {
        votoConfirmado = true;
        votos.push({
            cargo: etapas[etapaAtual].titulo,
            voto: numeroDigitado
        });
    }
    if(votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
            audio.src = 'assets/media/votacao.mp3';
            audio.play();
            comecarEtapa();
        } else {
            audio.src = 'assets/media/fim.mp3';
            audio.play();
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>';
        }
        
    }
}

comecarEtapa();