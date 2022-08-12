let cart = [];
let modalQt = 1;
let pizzaIndex;
//Listagem das Pizzas

pizzaJson.map((item, index)=>{
    let pizzaItem = document.querySelector('.pizza-item').cloneNode(true);

    pizzaItem.setAttribute('index', index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price[0]}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    //Abrindo o Modal
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        let i = e.target.closest('.pizza-item').getAttribute('index');
        modalQt = 1;
        pizzaIndex = i;
        
        document.querySelector('.pizzaBig img').src = pizzaJson[i].img;
        document.querySelector('.pizzaInfo h1').innerHTML = pizzaJson[i].name;
        document.querySelector('.pizzaInfo--desc').innerHTML = pizzaJson[i].description;
        document.querySelector('.pizzaInfo--size.selected').classList.remove('selected');
        document.querySelectorAll('.pizzaInfo--size').forEach((sizeItem, sizeIndex)=>{
            if(sizeIndex == 0) {
                sizeItem.classList.add('selected');
            }
            sizeItem.querySelector('span').innerHTML = pizzaJson[i].sizes[sizeIndex];
        });
        document.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[i].price[0]}`;
        document.querySelector('.pizzaInfo--qt').innerHTML = modalQt;

        document.querySelector('.pizzaWindowArea').style.opacity = '0';
        document.querySelector('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=>{
            document.querySelector('.pizzaWindowArea').style.opacity = '1';
        },200);
    });

    document.querySelector('.pizza-area').append(pizzaItem);
});

//Eventos do Modal

//Seleção de Tamanho
document.querySelectorAll('.pizzaInfo--size').forEach((sizeItem, sizeIndex)=>{
    sizeItem.addEventListener('click',()=>{
        document.querySelector('.pizzaInfo--size.selected').classList.remove('selected');
        sizeItem.classList.add('selected');
        document.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[pizzaIndex].price[sizeIndex]}`;
    });
});

//Seleção Quantidade
document.querySelector('.pizzaInfo--qtmenos').addEventListener('click',()=>{
    if(modalQt > 1){
        modalQt--;
        document.querySelector('.pizzaInfo--qt').innerHTML = modalQt;
    }
});
document.querySelector('.pizzaInfo--qtmais').addEventListener('click',()=>{
    modalQt++;
    document.querySelector('.pizzaInfo--qt').innerHTML = modalQt;
});

//Fechar Modal
document.querySelectorAll('.pizzaInfo--cancelMobileButton, .pizzaInfo--cancelButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});

function closeModal(){
    document.querySelector('.pizzaWindowArea').style.opacity = '0';
        setTimeout(()=>{
            document.querySelector('.pizzaWindowArea').style.display = 'none';
        },500);
    window.scrollTo({
        top:0,
        behavior: "smooth"
    });
}