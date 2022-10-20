let pizzaIndex;
let priceSelected;
let modalQt;
let cart = [];

pizzaJson.map((item, index)=>{
    let pizzaItem = document.querySelector('.pizza-item').cloneNode(true);

    pizzaItem.setAttribute('index',index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price[0].toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('a').addEventListener('click',(e)=>{
        e.preventDefault();
        pizzaIndex = e.target.closest('.pizza-item').getAttribute('index');
        modalQt = 1;

        document.querySelector('.pizzaBig img').src = pizzaJson[pizzaIndex].img;
        document.querySelector('.pizzaInfo h1').innerHTML = pizzaJson[pizzaIndex].name;
        document.querySelector('.pizzaInfo--desc').innerHTML = pizzaJson[pizzaIndex].description;
        document.querySelector('.pizzaInfo--size.selected').classList.remove('selected');
        document.querySelectorAll('.pizzaInfo--size').forEach((sizeItem,sizeIndex)=>{
            sizeItem.querySelector('span').innerHTML = pizzaJson[pizzaIndex].sizes[sizeIndex];
            if(sizeIndex == 0){
                sizeItem.classList.add('selected');
                priceSelected = pizzaJson[pizzaIndex].price[sizeIndex].toFixed(2);
                document.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${priceSelected}`;
            }
        });
        document.querySelector('.pizzaInfo--qt').innerHTML = modalQt;

        document.querySelector('.pizzaWindowArea').style.opacity = '0';
        document.querySelector('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=>{
            document.querySelector('.pizzaWindowArea').style.opacity = '1';
        },200);
    });

    document.querySelector('.pizza-area').append(pizzaItem);
});

//adicionando eventos do modal

//seleção de tamanho

document.querySelectorAll('.pizzaInfo--size').forEach((itemSize,indexSize)=>{
    itemSize.addEventListener('click',()=>{
        document.querySelector('.pizzaInfo--size.selected').classList.remove('selected');
        itemSize.classList.add('selected');
        priceSelected = pizzaJson[pizzaIndex].price[indexSize].toFixed(2);
        document.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${priceSelected}`;
    });
});

//Seleção de quantidade.

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

//botão cancelar

document.querySelectorAll('.pizzaInfo--cancelMobileButton, .pizzaInfo--cancelButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});

function closeModal() {
    document.querySelector('.pizzaWindowArea').style.opacity = '0';
    setTimeout(()=>{
        document.querySelector('.pizzaWindowArea').style.display = 'none';
    },500);
    
    window.scrollTo({
        top:0,
        behavior: "smooth"
    });
}

//botão adicionar ao carrinho
document.querySelector('.pizzaInfo--addButton').addEventListener('click',()=>{
    let size = document.querySelector('.pizzaInfo--size.selected').getAttribute('data-key');
    let key = pizzaJson[pizzaIndex].id + '*' + size;
    let i = cart.findIndex((item)=>item.key == key);

    if (i > -1) {
        cart[i].qt+= modalQt;
    } else {
        cart.push({
            key:key,
            id:pizzaJson[pizzaIndex].id,
            size:size,
            price:priceSelected,
            qt:modalQt
        });
    }
    closeModal();
    updateCart();
});

function updateCart() {
    if(cart.length > 0){
        document.querySelector('aside').classList.add('show');
    }else {
        document.querySelector('aside').classList.remove('show');
    }
}