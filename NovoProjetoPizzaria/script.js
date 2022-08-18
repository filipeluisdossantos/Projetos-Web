let pizzaIndex;
let priceSelected = 0;
let modalQt = 1;
let cart = [];


//Listando as pizzas
pizzaJson.map((item,index)=>{
    let pizzaItem = document.querySelector('.pizza-item').cloneNode(true);


    pizzaItem.setAttribute('index',index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price[0].toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    //Abrindo o modal
    pizzaItem.querySelector('a').addEventListener('click',(e)=>{
        e.preventDefault();
        pizzaIndex = e.target.closest('.pizza-item').getAttribute('index');
        modalQt = 1;

        document.querySelector('.pizzaBig img').src = pizzaJson[pizzaIndex].img;
        document.querySelector('.pizzaInfo h1').innerHTML = pizzaJson[pizzaIndex].name;
        document.querySelector('.pizzaInfo--desc').innerHTML = pizzaJson[pizzaIndex].description;
        document.querySelector('.pizzaInfo--size.selected').classList.remove('selected');
        document.querySelectorAll('.pizzaInfo--size').forEach((sizeItem,sizeIndex)=>{
            if(sizeIndex == 0){
                sizeItem.classList.add('selected');
                priceSelected = pizzaJson[pizzaIndex].price[0].toFixed(2);
            }
            sizeItem.querySelector('span').innerHTML = pizzaJson[pizzaIndex].sizes[sizeIndex];
        });
        document.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${priceSelected}`;
        document.querySelector('.pizzaInfo--qt').innerHTML = modalQt;
        document.querySelector('.pizzaWindowArea').style.opacity = '0';
        document.querySelector('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=>{
            document.querySelector('.pizzaWindowArea').style.opacity = '1';
        },200);
        
    });

    document.querySelector('.pizza-area').append(pizzaItem);
});

//Eventos do modal

//Seleção tamanho
document.querySelectorAll('.pizzaInfo--size').forEach((sizeItem,sizeIndex)=>{
    sizeItem.addEventListener('click',()=>{
        priceSelected = pizzaJson[pizzaIndex].price[sizeIndex];
        priceSelected= priceSelected.toFixed(2);
        document.querySelector('.pizzaInfo--size.selected').classList.remove('selected');
        sizeItem.classList.add('selected');
        document.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${priceSelected}`;
    });
});

//selecão quantidade
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

//botao cancelar
document.querySelectorAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});

function closeModal(){
    document.querySelector('.pizzaWindowArea').style.opacity = '0';
    setTimeout(()=>{
        document.querySelector('.pizzaWindowArea').style.display = 'none';
    },500);
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

//adicionando ao carrinho
document.querySelector('.pizzaInfo--addButton').addEventListener('click',()=>{
    let size = document.querySelector('.pizzaInfo--size.selected').getAttribute('data-key');
    let identifier = pizzaJson[pizzaIndex].id +'*'+size;
    let verif = cart.findIndex((item)=>{
        return item.identifier == identifier;
    });

    if(verif > -1){
        cart[verif].qt+= modalQt;
    }else {
        cart.push({
            identifier,
            id:pizzaJson[pizzaIndex].id,
            size:size,
            qt:modalQt,
            price:priceSelected
        });
    }
    closeModal();
    updateCart();
});

function updateCart() {
    
}