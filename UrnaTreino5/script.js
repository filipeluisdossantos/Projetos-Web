var seuVotoPara = document.querySelector('.seuvotopara span');
var cargo = document.querySelector('.cargo span');
var numero = document.querySelector('.numero');
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
    let numeroHtml = '';
    numeroDigitado = '';
    votoNulo = false;
    votoBranco = false;

    for(let i=0; i < etapa.numeros; i++) {
        if(i==0) {
            numeroHtml = '<div class="digito pisca"></div>';
        } else {
            numeroHtml += '<div class="digito"></div>'
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    numero.innerHTML = `<span>Número:</span>${numeroHtml}`;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
}

function atualizarInterface() {
    let candidato = etapas[etapaAtual].candidatos.filter((item)=>{
        if(item.numero == numeroDigitado) {
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
                descricao.innerHTML = `<div>Nome: ${candidato.nome}<br>Partido: ${candidato.partido}<br>Vice: ${candidato.vice}</div>`;
            } else {
                fotosHtml += `<div class="foto-candidato"><img src="images/${candidato.fotos[i].url}" alt="foto do candidato">${candidato.fotos[i].legenda}</div>`;
                descricao.innerHTML = `<div>Nome: ${candidato.nome}<br>Partido: ${candidato.partido}</div>`;
            }
        }

        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        lateral.innerHTML = fotosHtml;
    } else {
        votoNulo = true;
        
        seuVotoPara.style.display = 'block';
        descricao.innerHTML = `<div class="descricao--grande pisca">VOTO NULO</div>`;
        aviso.style.display = 'block';
        lateral.innerHTML = '';
    }
}

function clicou(n) {
    let pisca = document.querySelector('.digito.pisca');
    if(pisca !== null) {
        numeroDigitado = `${numeroDigitado}${n}`;
        pisca.innerHTML = n;
        pisca.classList.remove('pisca');
        if(pisca.nextElementSibling) {
            pisca.nextElementSibling.classList.add('pisca');
        } else {
            atualizarInterface();
        }
    }
}

function branco() {
    if(numeroDigitado == '') {
        votoBranco = true;

        seuVotoPara.style.display = 'block';
        numero.innerHTML = '';
        descricao.innerHTML = `<div class="descricao--grande pisca">VOTO EM BRANCO</div>`;
        aviso.style.display = 'block';
        lateral.innerHTML = '';
    } else {
        descricao.innerHTML = `<div class="descricao--pequeno">Para voto em BRANCO não deve ser digitado números</div></br><div class="descricao--pequeno pisca">Aperte a Tecla <span>CORRIGE</span> para REINICIAR o voto</div>`;
    }
}

function corrige() {
    comecarEtapa();
}

function confirma() {
    let votoConfirmado = false;
    let fimAudio = new Audio();

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
    } else if(numeroDigitado.length == etapas[etapaAtual].numeros) {
        votoConfirmado = true;
        votos.push({
            cargo: etapas[etapaAtual].titulo,
            voto: numeroDigitado
        });
    }
    if(votoConfirmado) {
        fimAudio.src = 'assets/votacao.mp3';
        fimAudio.play();
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
            fimAudio.src = 'assets/fim.mp3';
            fimAudio.play();
            document.querySelector('.tela').innerHTML = `<div class="descricao--gigante pisca">FIM</div>`;
            console.log(votos);
        }
        
    }
}

comecarEtapa();