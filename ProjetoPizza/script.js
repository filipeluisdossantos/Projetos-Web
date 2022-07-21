let modalQt = 1;

pizzaJson.map(function(item, index) {
    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true); //clonando a div pizza-item por completo.

    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`; //toFixed(2) pega 2 casas depois virg.
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('a').addEventListener('click', function(e){
        e.preventDefault(); //Previna ação padrão.Bloqueia ação de atualizar a tela
        let key = e.target.closest('.pizza-item').getAttribute('data-key'); //target ir pelo próprio elemento-- closest item mais proximo que tenha a classe -
        modalQt = 1;

        document.querySelector('.pizzaBig img').src = pizzaJson[key].img;
        document.querySelector('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        document.querySelector('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        document.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        document.querySelector('.pizzaInfo--size.selected').classList.remove('selected');
        document.querySelectorAll('.pizzaInfo--size').forEach(function(sizeItem, sizeIndex ) {
            if(sizeIndex == 2) {
              sizeItem.classList.add('selected');  
            }
            sizeItem.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });

        document.querySelector('.pizzaInfo--qt').innerHTML = modalQt;

        document.querySelector('.pizzaWindowArea').style.opacity = 0;
        document.querySelector('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            document.querySelector('.pizzaWindowArea').style.opacity = 1;
        }, 200); //aguardando para iniciar 1/5 de segundos.
    });


    document.querySelector('.pizza-area').append( pizzaItem);
});