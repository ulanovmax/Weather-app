const link = 'http://api.openweathermap.org/data/2.5/weather?id=703448&appid=3e9e0c88e77a6c7b422e45d43c267061'

const weatherData = async () => {
  const res = await fetch(link);

  const w = await res.json()
  console.log(w);
}

weatherData();


// Rain Animation

const weather = document.querySelector('.forecast');

if (weather.classList.contains('rainy')) {
  let drop;
  let counter = 50;
  
  for (let i = 0; i < counter; i++) {
    drop = document.createElement("div");
    drop.classList.add('drop');
    drop.style.left = Math.floor(Math.random() * window.innerWidth) + "px";
    drop.style.animationDuration = 0.2 + Math.random() * 0.3 + "s";
    drop.style.animationDelay = Math.random() * 5 + "s";
  
    document.body.appendChild(drop);
  }
  
}


