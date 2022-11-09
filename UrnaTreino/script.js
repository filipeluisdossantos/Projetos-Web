var seuvotopara = document.querySelector('.seuvotopara span');
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
    let quadradoHtml = '';
    numeroDigitado = '';
    votoNulo = false;
    votoBranco = false;


    for(let i=0; i < etapa.numeros; i++) {
        if(i==0){
            quadradoHtml = '<div class="digito pisca"></div>';
        } else {
            quadradoHtml += '<div class="digito"></div>';
        }
    }
    
    seuvotopara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    numero.innerHTML = `Número:${quadradoHtml}`;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
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
        candidato = candidato[0];
        seuvotopara.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;
        aviso.style.display = 'block';

        let fotosHtml = '';
        for(let i in candidato.fotos) {
            if(candidato.fotos[i].small){
                fotosHtml += `<div class="imagem-candidato small"><img src="images/${candidato.fotos[i].url}" alt=""><span>${candidato.fotos[i].legenda}</span></div>`;
                descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}<br/>Vice-Presidente: ${candidato.vice}`;
            } else {
                fotosHtml += `<div class="imagem-candidato"><img src="images/${candidato.fotos[i].url}" alt=""><span>${candidato.fotos[i].legenda}</span></div>`;
            }            
        }
       
        lateral.innerHTML = fotosHtml;
    } else {
        votoNulo = true;
        seuvotopara.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
        aviso.style.display = 'block';
        lateral.innerHTML = '';
    }
}

function clicou(n) {
    let numeroPisca = document.querySelector('.digito.pisca');
    if(numeroPisca !== null) {
        numeroPisca.innerHTML = n;
        numeroDigitado = `${numeroDigitado}${n}`;
        numeroPisca.classList.remove('pisca');
        if(numeroPisca.nextElementSibling !== null) {
            numeroPisca.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
        
    }
}

function branco() {
        votoBranco = true;
        seuvotopara.style.display = 'block';
        numero.innerHTML = '';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
        aviso.style.display = 'block';
        lateral.innerHTML = '';
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
            voto: 'Branco'
        });
    } else if (votoNulo == true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'Nulo'
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
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>';
            console.log(votos);
        }
    }
}

comecarEtapa();