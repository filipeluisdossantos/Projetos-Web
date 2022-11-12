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

function comercarEtapa() {
    let etapa = etapas[etapaAtual];
    let numeroHtml = '';
    numeroDigitado = '';
    votoNulo = false;
    votoBranco = false;

    for(let i=0; i < etapa.numeros; i++) {
        if(i==0) {
            numeroHtml = `<span>Número:</span> <div class="digito pisca"></div>`;
        } else {
            numeroHtml += '<div class="digito"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    numero.innerHTML = numeroHtml;
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
                descricao.innerHTML = `<div>Nome: ${candidato.nome} <br>Partido: ${candidato.partido} <br>Vice: ${candidato.vice}</div>`;
            } else {
                fotosHtml += `<div class="foto-candidato"><img src="images/${candidato.fotos[i].url}" alt="foto do candidato">${candidato.fotos[i].legenda}</div>`;
                descricao.innerHTML = `<div>Nome: ${candidato.nome} <br>Partido: ${candidato.partido}</div>`;
            }
        }
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        lateral.innerHTML = fotosHtml;
    } else {
        votoNulo = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
        lateral.innerHTML = '';
    }
    
}

function clicou(n) {
    let campoPisca = document.querySelector('.digito.pisca');
    if(campoPisca !== null){
        numeroDigitado = `${numeroDigitado}${n}`;
        campoPisca.innerHTML = n;
        campoPisca.classList.remove('pisca');
        if(campoPisca.nextElementSibling) {
            campoPisca.nextElementSibling.classList.add('pisca');
        } else {
            atualizarInterface();
        }
    }
}

function branco() {   
    if(numeroDigitado == ''){
        votoBranco = true;

        seuVotoPara.style.display = 'block';
        numero.innerHTML = '';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
    } else {
        descricao.innerHTML = '<div class="aviso--pequeno">Para voto em BRANCO não poder ser digitado números</div><br/><div class="aviso--normal">Aperte a Tecla: <span>CORRIGE</span> para REINICIAR o voto</div>';
    }
}

function corrige() {
    comercarEtapa();
}

function confirma() {
    let votoValido = false;
    if(votoBranco == true) {
        votoValido = true;
        votos.push({
            cargo: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    } else if(votoNulo == true) {
        votoValido = true;
        votos.push({
            cargo: etapas[etapaAtual].titulo,
            voto: 'nulo'
        });
    } else if (numeroDigitado.length == etapas[etapaAtual].numeros) {
        votoValido = true;
        votos.push({
            cargo: etapas[etapaAtual].titulo,
            voto: numeroDigitado
        });
    } else {
        descricao.innerHTML = '<div class="aviso--pequeno">Favor digitar todos os números do candidato</div>';
    }
    if(votoValido == true){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
            comercarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante">FIM</div>';
            console.log(votos);
        }
    }
}

comercarEtapa();