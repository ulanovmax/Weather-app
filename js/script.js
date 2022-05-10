const weather = document.querySelector('.forecast'),
      temperature = weather.querySelector('.deg'),
      review = weather.querySelector('.review'),
      feelsLike = weather.querySelector('.feels_like'),
      humidity = weather.querySelector('.details__data.humidity'),
      pressure = weather.querySelector('.details__data.pressure'),
      wind = weather.querySelector('.details__data.wind'),
      cityName = weather.querySelector('.main_city'),
      searchInput = weather.querySelector('.search__input'),
      searchBtn = weather.querySelector('.search__btn');

// let city = 'Odessa';

searchInput.addEventListener('keydown', e => {
  if (e.key == 'Enter') {
    searchCity()
  }
});

searchBtn.addEventListener('click', e => {
  e.preventDefault();
  searchCity()
})

// Search of City

function searchCity() {
  const val = searchInput.value;
  if (!val) return false;
  initWeather(val);
  searchInput.value = '';
}

// Temperature to Celsius

function temp(temp) {
  const tempToC = Math.floor(temp) - 273;
  return tempToC;
}

// Capitalize

function capitalize(str) {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1);
}

function initWeather(city = 'Odessa') {
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3e9e0c88e77a6c7b422e45d43c267061`)
    .then(res => res.json())
    .then(data => {

      cityName.textContent = capitalize(data.name);

      // Temperature

      temperature.textContent = temp(data.main.temp) + '°';
      review.textContent = capitalize(data.weather[0].description);
      feelsLike.textContent = temp(data.main.feels_like) + '°'
      humidity.textContent = data.main.humidity + '%';
      pressure.textContent = data.main.pressure + ' hPa';
      wind.textContent = data.wind.speed + ' m/hour';

      // Weather conditions

      const drops = document.querySelector('.drops');
      const snow = document.querySelector('.snow');

      weather.classList.remove('rainy');
      weather.classList.remove('snow');
      if (drops) {
        drops.remove()
      } else if (snow) {
        snow.remove()
      }

      if (data.weather[0].main == 'Clear') {
        weather.classList.add('sunny');
      } else if (data.weather[0].main == 'Rain') {
        weather.classList.add('rainy');
        rain()
      } else if (data.weather[0].main == 'Snow') {
        weather.classList.add('snow');
        snow()
      }
    })
}

initWeather()

// List of sities

const cityItems = weather.querySelector('.city__list');

function cityList(city, i) {
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3e9e0c88e77a6c7b422e45d43c267061`)
    .then(res => res.json())
    .then(data => {
      const names = weather.querySelectorAll('.city_name');
      const temps = weather.querySelectorAll('.city_list_deg'); 

      names[i].textContent = capitalize(data.name);
      temps[i].textContent = temp(data.main.temp) + '°';
    })
}

cityList('New York',0);
cityList('London',1);
cityList('moscow',2);

cityItems.addEventListener('click', e => {
  e.preventDefault();
  let targ = e.target ;
  if (targ && targ.matches('.city__list_item')) {
    initWeather(targ.querySelector('.city_name').textContent)
  }
})

// Date

const dateTime = weather.querySelector('.date_time'),
      dateDay = weather.querySelector('.calendar_day');

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
  if (num > 10) {
    return num
  } else {
    '0' + num
  } 
}

const date = new Date();
const n = date.getDay();

function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  const strTime = `${hours}:${minutes} ${ampm}`
  return strTime;
}

dateTime.textContent = formatAMPM(date);

setTimeout(() => {
  formatAMPM(date);
}, 1000); 

dateDay.textContent = `${days[n]} ${date.getDate()}th, ${date.getFullYear()}`;

// Time

const hour = date.getHours()

if (hour >= 5 && hour < 17) {
  weather.classList.add('sunny');
}
if (hour >= 17 && hour < 21) {
  weather.classList.add('sunset');
}
if (hour >= 21) {
  weather.classList.add('night');
}
if (hour >= 0 && hour < 5) {
  weather.classList.add('night');
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
    weather.append(drops);
  }
}

// Snow Animation

function snow() {
  let flake;
  let counter = 50;
  const snow = document.createElement('div');
  snow.classList.add('snow');
  for (let i = 0; i < counter; i++) {
    flake = document.createElement("div");
    flake.classList.add('flake');
    flake.style.left = Math.floor(Math.random() * window.innerWidth) + "px";
    flake.style.animationDuration = 5 + Math.random() * 5 + "s";
    flake.style.animationDelay = Math.random() * 5 + "s";
    snow.append(flake);
    weather.append(snow)
  }
}




