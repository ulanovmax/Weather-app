
const weather = document.querySelector('.forecast'),
      dateTime = weather.querySelector('.date_time'),
      dateDay = weather.querySelector('.calendar_day'),
      temperature = weather.querySelector('.deg'),
      review = weather.querySelector('.review'),
      feelsLike = weather.querySelector('.feels_like'),
      humidity = weather.querySelector('.details__data.humidity'),
      pressure = weather.querySelector('.details__data.pressure'),
      wind = weather.querySelector('.details__data.wind'),
      cityName = weather.querySelector('.main_city'),
      searchInput = weather.querySelector('.search__input'),
      searchBtn = weather.querySelector('.search__btn');

let city = 'Odessa';

searchInput.addEventListener('keydown', e => {
  if (e.key == 'Enter') {
    searchCity()
  }
});

searchBtn.addEventListener('click', e => {
  e.preventDefault();
  searchCity()
})

function searchCity() {
  const val = searchInput.value;
  if (!val) return false;
  city = val;
  initWeather();
  searchInput.value = '';
}

initWeather()


function initWeather() {
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3e9e0c88e77a6c7b422e45d43c267061`)
    .then(res => res.json())
    .then(data => {

      console.log(data);
      function capitalize(str) {
        if (!str) return str;
      
        return str[0].toUpperCase() + str.slice(1);
      }

      cityName.textContent = capitalize(data.name);

      // Date
      const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ];

      function setZero(num) {
        if (num < 10) {
          return `0${num}`
        } else {
          return num
        }
      }
      
      const date = new Date(),
            hours = date.getHours(),
            n = date.getDay(),
            ampm = hours >= 12 ? 'PM' : 'AM';

      dateTime.textContent = `${setZero(hours)}:${setZero(date.getMinutes())} ${ampm}`
      dateDay.textContent = `${days[n]} ${date.getDate()}th, ${date.getFullYear()}`;

      // Temperature

      function temp(temp) {
        const tempToC = Math.floor(temp) - 273;
        return tempToC;
      }

      temperature.textContent = temp(data.main.temp) + '°';
      review.textContent = capitalize(data.weather[0].description);
      feelsLike.textContent = temp(data.main.feels_like) + '°'
      humidity.textContent = data.main.humidity + '%';
      pressure.textContent = data.main.pressure + ' hPa';
      wind.textContent = data.wind.speed + ' m/hour';

      // Weather conditions

      weather.classList.remove('rainy');

      if (data.weather[0].main == 'Clear') {
        weather.classList.add('sunny');
      } else if (data.weather[0].main == 'Rain' ) {
        weather.classList.add('rainy');
        rain()
      } 

      // Time

      if (hours < 4) {
        weather.classList.add('night');
        weather.classList.remove('sunny');
      } else {
        weather.classList.add('sunny');
        weather.classList.remove('night');
      }

    })
}




// Rain Animation

function rain() {
  let drop;
  let counter = 50;
  const drops = document.createElement('div');
  drops.classList.add('drops');
  for (let i = 0; i < counter; i++) {
    drop = document.createElement("div");
    drop.classList.add('drop');
    drop.style.left = Math.floor(Math.random() * window.innerWidth) + "px";
    drop.style.animationDuration = 0.2 + Math.random() * 0.3 + "s";
    drop.style.animationDelay = Math.random() * 5 + "s";
  
    drops.append(drop);
    weather.append(drops)
  }
}
  



