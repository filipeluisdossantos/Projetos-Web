
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

        
        document.querySelector('.pizzaWindowArea').style.display = 'flex';

    });


    document.querySelector('.pizza-area').append(pizzaItem);
});