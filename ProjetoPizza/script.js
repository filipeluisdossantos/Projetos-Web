pizzaJson.map(function(item, index) {
    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true); //clonando a div pizza-item por completo.


    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`; //toFixed(2) pega 2 casas depois virg.
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('a').addEventListener('click', function(e){
        e.preventDefault();  //Previna ação padrão.Bloqueia ação de atualizar a tela
        document.querySelector('.pizzaWindowArea').style.opacity = 0;
        document.querySelector('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            document.querySelector('.pizzaWindowArea').style.opacity = 1;
        }, 200); //aguardando para iniciar 1/5 de segundos.
    });


    document.querySelector('.pizza-area').append( pizzaItem);
});