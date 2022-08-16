let cart = [];
let modalQt = 1;
let pizzaIndex;
let priceSelected = 0;
//Listagem das Pizzas

pizzaJson.map((item, index)=>{
    let pizzaItem = document.querySelector('.pizza-item').cloneNode(true);

    pizzaItem.setAttribute('index', index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price[0].toFixed(2)}`;
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
                priceSelected = pizzaJson[i].price[0].toFixed(2)
            }
            sizeItem.querySelector('span').innerHTML = pizzaJson[i].sizes[sizeIndex];
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

//Eventos do Modal

//Seleção de Tamanho
document.querySelectorAll('.pizzaInfo--size').forEach((sizeItem, sizeIndex)=>{
    sizeItem.addEventListener('click',()=>{
        document.querySelector('.pizzaInfo--size.selected').classList.remove('selected');
        sizeItem.classList.add('selected');
        priceSelected = pizzaJson[pizzaIndex].price[sizeIndex];
        priceSelected = priceSelected.toFixed(2);
        document.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${priceSelected}`;
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

//adicionar ao carrinho

document.querySelector('.pizzaInfo--addButton').addEventListener('click',()=>{
    let size = document.querySelector('.pizzaInfo--size.selected').getAttribute('data-key');
    let identifier = pizzaJson[pizzaIndex].id + '*' + size;
    let cartIndex = cart.findIndex((item)=>item.identifier == identifier);


   if(cartIndex > -1) {
    cart[cartIndex].qt+=modalQt;
   } else {
        cart.push({
            identifier:identifier,
            id:pizzaJson[pizzaIndex].id,
            size:size,
            price:priceSelected,
            qt:modalQt
        });
   }

   closeModal();
   updateCart();
});

//Atualizar carrinho
function updateCart(){
    document.querySelector('.menu-openner span').innerHTML = cart.length;
    if(cart.length > 0) {
        document.querySelector('aside').classList.add('show');
        document.querySelector('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in cart) {
            let pizza = pizzaJson.find((item)=>item.id == cart[i].id);
            subtotal += cart[i].price * cart[i].qt;
            let cartItem = document.querySelector('.cart--item').cloneNode(true);
            let nameSize = `${pizza.name} (${cart[i].size})`;

            cartItem.querySelector('.cart--item img').src = pizza.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = nameSize;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
                if(cart[i].qt > 1) {
                    cart[i].qt--;
                    updateCart();
                } else {
                    cart.splice(i,1);
                    updateCart();
                }
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                cart[i].qt++;
                updateCart();
            });

            document.querySelector('.cart').append(cartItem);
        }
        
        desconto = subtotal  * 0.1;
        total = subtotal - desconto;


        document.querySelector('.subtotal span:last-Child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        document.querySelector('.desconto span:last-Child').innerHTML = `RS ${desconto.toFixed(2)}`;
        document.querySelector('.total span:last-Child').innerHTML = `R$ ${total.toFixed(2)}`;
        

    } else {
        document.querySelector('aside').classList.remove('show');
        document.querySelector('aside').style.left = '100vw';
    }
}

//Evento mobile
document.querySelector('.menu-openner').addEventListener('click',()=>{
    if(cart.length > 0){
        document.querySelector('aside').style.left = '0';
    }
});

document.querySelector('.menu-closer').addEventListener('click',()=>{
    document.querySelector('aside').style.left = '100vw';
});