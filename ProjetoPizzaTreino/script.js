let pizzaIndex;


pizzaJson.map((item, index)=> {
    let pizzaItem = document.querySelector('.pizza-item').cloneNode(true);

    pizzaItem.setAttribute('index', index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price[0].toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('a').addEventListener('click',(e)=>{
        e.preventDefault();
        pizzaIndex = e.target.closest('.pizza-item').getAttribute('index');
        
        document.querySelector('.pizzaWindowArea').style.opacity = '0';
        document.querySelector('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=>{
            document.querySelector('.pizzaWindowArea').style.opacity = '1';
        },200);
    });

    document.querySelector('.pizza-area').append(pizzaItem);
});