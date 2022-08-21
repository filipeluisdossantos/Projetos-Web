let pizzaIndex;
let priceSelected = 0;
let modaQt = 1;
let cart = [];

pizzaJson.map((item, index)=>{
   let pizzaItem = document.querySelector('.pizza-item').cloneNode(true);

   pizzaItem.setAttribute('index', index);
   pizzaItem.querySelector('img').src = item.img;
   pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price[0].toFixed(2)}`;
   pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
   pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
   pizzaItem.querySelector('a').addEventListener('click',(e)=>{
    e.preventDefault();
    pizzaIndex = e.target.closest('.pizza-item').getAttribute('index');
    modaQt = 1;
    
    document.querySelector('.pizzaBig img').src = pizzaJson[pizzaIndex].img;
    document.querySelector('.pizzaInfo h1').innerHTML = pizzaJson[pizzaIndex].name;
    document.querySelector('.pizzaInfo--desc').innerHTML = pizzaJson[pizzaIndex].description;
    document.querySelector('.pizzaInfo--size.selected').classList.remove('selected');
    document.querySelectorAll('.pizzaInfo--size').forEach((sizeItem, sizeIndex)=>{
        sizeItem.querySelector('span').innerHTML = pizzaJson[pizzaIndex].sizes[sizeIndex];
        if(sizeIndex == 0) {
            sizeItem.classList.add('selected');
            priceSelected = pizzaJson[pizzaIndex].price[0].toFixed(2);
            document.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${priceSelected}`;
        }
    });
    document.querySelector('.pizzaInfo--qt').innerHTML = modaQt;

    document.querySelector('.pizzaWindowArea').style.opacity = '0';
    document.querySelector('.pizzaWindowArea').style.display = 'flex';
    setTimeout(()=>{
        document.querySelector('.pizzaWindowArea').style.opacity = '1';
    },200);

   });

    document.querySelector('.pizza-area').append(pizzaItem);
});

//Eventos do modal

//Selecionando tamanho
document.querySelectorAll('.pizzaInfo--size').forEach((sizeItem, sizeIndex)=>{
    sizeItem.addEventListener('click',()=>{
        document.querySelector('.pizzaInfo--size.selected').classList.remove('selected');
        sizeItem.classList.add('selected');
        priceSelected = pizzaJson[pizzaIndex].price[sizeIndex].toFixed(2);
        document.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${priceSelected}`;
    });
});

//Selecionando qt
document.querySelector('.pizzaInfo--qtmenos').addEventListener('click',()=>{
    if(modaQt > 1){
        modaQt--;
        document.querySelector('.pizzaInfo--qt').innerHTML = modaQt;
    }
});

document.querySelector('.pizzaInfo--qtmais').addEventListener('click',()=>{
    modaQt++;
    document.querySelector('.pizzaInfo--qt').innerHTML = modaQt;
});

//botão cancelar
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
        behavior:"smooth"
    });
}

//adicionar ao carrinho
document.querySelector('.pizzaInfo--addButton').addEventListener('click',()=>{
    let size = document.querySelector('.pizzaInfo--size.selected').getAttribute('data-key');
    let key = pizzaJson[pizzaIndex].id + '*' + size;
    let i = cart.findIndex((item)=>item.key == key);

    if(i > -1) {
        cart[i].qt+=modaQt;
    }else {
        cart.push({
            key:key,
            id:pizzaJson[pizzaIndex].id,
            size:size,
            qt:modaQt,
            price:priceSelected
        });
    }
    closeModal();
    updateCart();
});

function updateCart() {
    document.querySelector('.menu-openner span').innerHTML = cart.length;
    if(cart.length > 0) {
        document.querySelector('aside').classList.add('show');
        document.querySelector('.cart').innerHTML = '';
        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in cart){
            let cartpizza = pizzaJson.find((item)=>item.id == cart[i].id);
            subtotal += cart[i].price * cart[i].qt;
            let estruItem = document.querySelector('.cart--item').cloneNode(true);
            let nameSize = `${cartpizza.name} (${cart[i].size})`;

            estruItem.querySelector('img').src = cartpizza.img;
            estruItem.querySelector('.cart--item-nome').innerHTML = nameSize;
            estruItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            estruItem.querySelector('.cart--item-qtmenos').addEventListener('click',()=>{
                if(cart[i].qt > 1){
                    cart[i].qt--;
                    updateCart();
                }else{
                    cart.splice(i,1);
                    updateCart();
                }
            });
            estruItem.querySelector('.cart--item-qtmais').addEventListener('click',()=>{
                cart[i].qt++;
                updateCart();
            });

            document.querySelector('.cart').append(estruItem);
        }
        desconto = subtotal * 0.1;
        total = subtotal - desconto;

        document.querySelector('.subtotal span:last-Child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        document.querySelector('.desconto span:last-Child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        document.querySelector('.total span:last-Child').innerHTML = `R$ ${total.toFixed(2)}`;

    }else {
        document.querySelector('aside').classList.remove('show');
        document.querySelector('aside').style.left = '100vw';
    }
}

//botao carrinho mobile
document.querySelector('.menu-openner').addEventListener('click',()=>{
    if(cart.length > 0){
        document.querySelector('aside').style.left = '0';
    }
});

document.querySelector('.menu-closer').addEventListener('click',()=>{
    document.querySelector('aside').style.left = '100vw';
})