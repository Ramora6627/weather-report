'use strict';
// const axios = require('axios');

window.onload = function () {
  newTemperature();
  changeCity();
  changeSky();
};

let city = 'Seattle';
let temperature = 70;

const increaseTemp = function () {
  temperature += 1;
  newTemperature();
};

const decreaseTemp = function () {
  temperature -= 1;
  newTemperature();
};

const getCurrentTemp = function () {
  let latitude;
  let longitude;

  axios
    .get('http://localhost:5000/location', { params: { q: city } })
    .then((response) => {
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;
      axios
        .get('http://localhost:5000/weather', {
          params: { lat: latitude, lon: longitude },
        })
        .then((response) => {
          const kelvin = response.data.current.temp;
          const fahrenheit = (9 / 5) * (kelvin - 273) + 32;
          temperature = Math.round(fahrenheit);
          newTemperature();
        })
        .catch((error) => {
          console.log('errorrrr');
        });
    })
    .catch((error) => {
      console.log('error :(');
    });
};

const resetCity = function () {
  city = 'Seattle';
  document.querySelector('#cityname').value = '';
  const curWeatherHeader = document.getElementById('cityheader');
  curWeatherHeader.textContent = 'Current Weather for ' + city;
};

const changeCity = function () {
  // if the #cityname element is changed
  const input = document.querySelector('#cityname');
  input.addEventListener('change', updateValue);

  // update header to display city name and update city variable
  const curWeatherHeader = document.getElementById('cityheader');
  function updateValue(e) {
    city = e.target.value;
    curWeatherHeader.textContent = 'Current Weather for ' + city;
  }
};

const changeSky = function () {
  const input = document.querySelector('#skytype-select');

  input.addEventListener('change', (event) => {
    const skyOutput = document.querySelector('#sky');
    skyOutput.textContent = getSky(event.target.value);
  });
};

const newTemperature = function () {
  const temperatureMessage =  temperature + '\u00B0F';
  document.getElementById('temperature').innerHTML = temperatureMessage;
  setTextColorLandscapeBasedOnTemp();
};

const setTextColorLandscapeBasedOnTemp = function () {
  let img;
  let tempColor = '';
  if (temperature >= 80) {
    tempColor = 'red';
    img = 'desert'

  } else if (temperature >= 70) {
    tempColor = 'orange';
    img = 'spring';
  } else if (temperature >= 60) {
    tempColor = 'yellow';
    img = 'spring';
  } else if (temperature >= 50) {
    tempColor = 'green';
    img = 'winter';
  } else if (temperature < 50) {
    tempColor = 'teal';
    img = 'freez';
  }
  document.getElementById('temperature').style.color = tempColor;
  document.queryCommandValue("#skyContent");
  skyContent.classList = `grid-item-1 ${img}`;
}


const updateSky = () => {
  const optionSky = document.querySelector('#skytype').value;
  const skyContainer = document.querySelector('#sky');
  let img;
  if (optionSky === 'cloudy') {
    img = 'cloudy';
} else if (optionSky === 'sunny') {
    img = 'sunny';
} else if (optionSky === 'rainy') {
    img = 'rainy';
} else if (optionSky === 'snowy') {
    img = 'snowy'
}

skyContainer.textContent = '';
const skyContent = document.querySelector('#skyIllustration');
skyContent.classList = `grid-item-2 ${img}`;
}





const skySelect = document.querySelector("#skytype");
skySelect.addEventListener('change', updateSky);