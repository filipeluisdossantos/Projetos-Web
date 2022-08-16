let pizzaIndex;
let priceSelected = 0;

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

        document.querySelector('.pizzaBig img').src = pizzaJson[pizzaIndex].img;
        document.querySelector('.pizzaInfo h1').innerHTML = pizzaJson[pizzaIndex].name;
        document.querySelector('.pizzaInfo--desc').innerHTML = pizzaJson[pizzaIndex].description;
        document.querySelector('.pizzaInfo--size.selected').classList.remove('selected');
        document.querySelectorAll('.pizzaInfo--size').forEach((sizeItem,sizeIndex)=>{
            sizeItem.querySelector('span').innerHTML = pizzaJson[pizzaIndex].sizes[sizeIndex];
            priceSelected = pizzaJson[pizzaIndex].price[sizeIndex];
            priceSelected = priceSelected.toFixed(2);
            if(sizeIndex == 0){
                sizeItem.classList.add('selected');
                document.querySelector('.pizzaInfo--actualPrice').innerHTML = `R$ ${priceSelected}`;
            }
        });




        document.querySelector('.pizzaWindowArea').style.display = 'flex';
    });



    document.querySelector('.pizza-area').append(pizzaItem);
});