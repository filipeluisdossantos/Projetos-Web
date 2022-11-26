document.querySelector('.busca').addEventListener('submit',async(e)=>{
    e.preventDefault();
    let input = document.querySelector('#searchInput').value;

    if(input !== '') {
        clearInfo();
        showWarning('Buscando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=d40ecd17738597f828e1d592712d592b&units=metric&lang=pt_br`;

        let req = await fetch(url);
        let json = await req.json();

        if(json.cod === 200) {
            showInfo({
                nameCity: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                icon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windDeg: json.wind.deg
            });
        } else {
            clearInfo();
            showWarning('Cidade não encontrada.');
        }
    } else {
        clearInfo();
    }
});

function showInfo(json) {
    showWarning('');
    
    document.querySelector('.titulo').innerHTML = `${json.nameCity} - ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.temp img').setAttribute('src', `https://openweathermap.org/img/wn/${json.icon}@2x.png`);
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windDeg -90}deg)`;
    document.querySelector('.resultado').style.display = 'block';
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}