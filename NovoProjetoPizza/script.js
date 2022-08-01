let cart = [];
let modalQt = 1;
let modalIndex = 0;

pizzaJson.map((item, index)=> {
    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('index', index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    //Abrindo o Modal ao clicar

    pizzaItem.querySelector('a').addEventListener('click',(e)=>{
        e.preventDefault();
        let i = e.target.closest('.pizza-item').getAttribute('index');//closest = pega o elemento mais proximo do a (pizza-item)
        modalQt = 1;
        modalIndex = i;


        document.querySelector('.pizzaBig img').src = pizzaJson[i].img
        document.querySelector('.pizzaInfo h1').innerHTML = pizzaJson[i].name;
        document.querySelector('.pizzaInfo--desc').innerHTML = pizzaJson[i].description;
        document.querySelector('.pizzaInfo--size.selected').classList.remove('selected');
        document.querySelectorAll('.pizzaInfo--size').forEach((sizeItem, sizeIndex)=>{
            if(sizeIndex ==2){
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

// Eventos do modal

function closeModal() {
    document.querySelector('.pizzaWindowArea').style.opacity = '0';
    setTimeout(()=>{
        document.querySelector('.pizzaWindowArea').style.display = 'none';
    },500);
}

document.querySelectorAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});

document.querySelector('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQt > 1){
        modalQt--;
        document.querySelector('.pizzaInfo--qt').innerHTML = modalQt;
    }
});
document.querySelector('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQt++;
    document.querySelector('.pizzaInfo--qt').innerHTML = modalQt;
});

document.querySelectorAll('.pizzaInfo--size').forEach((sizeItem, sizeIndex)=>{
    sizeItem.addEventListener('click',()=>{
        document.querySelector('.pizzaInfo--size.selected').classList.remove('selected');
        sizeItem.classList.add('selected');
    });
});

// adicionando pizza no carrinho

document.querySelector('.pizzaInfo--addButton').addEventListener('click', ()=>{
    let size = parseInt(document.querySelector('.pizzaInfo--size.selected').getAttribute('data-key'));

    let identifier = pizzaJson[modalIndex].id+'@'+size;

    let key = cart.findIndex((item)=>{
        return item.identifier == identifier
    });

    if(key > -1){
        cart[key].qt += modalQt;
    } else {
        cart.push({
            identifier,
            id:pizzaJson[modalIndex].id,
            size,
            qt:modalQt
        });
    }

    closeModal();
}); 