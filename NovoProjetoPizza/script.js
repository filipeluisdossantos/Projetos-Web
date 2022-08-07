let modalQt = 1;
let cart = [];
let modalIndex = 0;


//Listando as Pizzas.

pizzaJson.map((item, index)=>{
    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('index', index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

// Abrir o Modal ao Clicar na Pizza.

    pizzaItem.querySelector('.pizza-item a').addEventListener('click',(e)=>{
        e.preventDefault();
        let i = e.target.closest('.pizza-item').getAttribute('index');
        modalIndex = i;
        modalQt = 1;

        document.querySelector('.pizzaBig img').src = pizzaJson[i].img;
        document.querySelector('.pizzaInfo h1').innerHTML = pizzaJson[i].name;
        document.querySelector('.pizzaInfo--desc').innerHTML = pizzaJson[i].description;
        document.querySelector('.pizzaInfo--size.selected').classList.remove('selected');
        document.querySelectorAll('.pizzaInfo--size').forEach((sizeItem, sizeIndex)=> {
            if(sizeIndex == 2){
                sizeItem.classList.add('selected');
            }
            sizeItem.querySelector('span').innerHTML = pizzaJson[i].sizes[sizeIndex];
        });

        document.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[i].price.toFixed(2)}`;
        document.querySelector('.pizzaInfo--qt').innerHTML = modalQt;
        document.querySelector('.pizzaWindowArea').style.opacity = '0';
        document.querySelector('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=>{
            document.querySelector('.pizzaWindowArea').style.opacity = '1';
        },200);  
    });


    document.querySelector('.pizza-area').append(pizzaItem);
});

//Eventos dos Modal

//Função selecionar tamanho

document.querySelectorAll('.pizzaInfo--size').forEach((sizeItem, sizeIndex)=> {
    sizeItem.addEventListener('click', ()=>{
        document.querySelector('.pizzaInfo--size.selected').classList.remove('selected');
        sizeItem.classList.add('selected');
    });
});
    
//Função alterar Quantidade

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

//Função Cancelar

document.querySelectorAll('.pizzaInfo--cancelMobileButton, .pizzaInfo--cancelButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});

function closeModal() {
    document.querySelector('.pizzaWindowArea').style.opacity = '0';
    setTimeout(()=>{
        document.querySelector('.pizzaWindowArea').style.display = 'none';
    },500);
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

//Função adicionar carrinho

 document.querySelector('.pizzaInfo--addButton').addEventListener('click', ()=>{
    let size = document.querySelector('.pizzaInfo--size.selected').getAttribute('data-key');
    let identifier = pizzaJson[modalIndex].id + '*' + size;
    let key = cart.findIndex((item)=>{
        return item.identifier == identifier;
    })

    if(key > -1) {
        cart[key].qt += modalQt;
    }else{
        cart.push({
            identifier:identifier,
            id:pizzaJson[modalIndex].id,
            size:size,
            qt:modalQt
        });
    }

    closeModal();
    updateCart();
 });

 function updateCart() {
    if(cart.length > 0) {
        document.querySelector('aside').classList.add('show');
        document.querySelector('.cart').innerHTML = '';
        for(let i in cart) {
            let pizzaItem = pizzaJson.find((item)=>{
                return item.id == cart[i].id;
            });
            let cartItem = document.querySelector('.models .cart--item').cloneNode(true);

            let pizzaSize = cart[i].size;
            let nameSize = `${pizzaItem.name} (${pizzaSize})`;

            cartItem.querySelector('.cart--item img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = nameSize;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click',()=>{
                if(cart[i].qt > 1) {
                    cart[i].qt--;
                }else{
                    cart.splice(i,1);
                }
                updateCart();
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click',()=>{
                cart[i].qt++;
                updateCart();
            });
        

            document.querySelector('.cart').append(cartItem);
            
        }


        

    }else{
        document.querySelector('aside').classList.remove('show');
    }
    
 }



