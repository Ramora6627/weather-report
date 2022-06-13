import 'regenerator-runtime/runtime';
import axios from 'axios';

'use strict';
// const axios = require('axios');

window.onload = () => {
  newTemperature();
  changeCity();
  changeSky();
};

let city = 'Atlanta';
let temperature = 70;

const increaseTemp = () => {
  temperature += 1;
  newTemperature();
};

const decreaseTemp = () => {
  temperature -= 1;
  newTemperature();
};

const getCurrentTemp = () => {
  let latitude;
  let longitude;

  const weatherData = axios.get('http://localhost:5001/location', { params: { q: city } })
    .then((response) => {
      latitude = response.data[0].lat;
      longitude = response.data[0].lon;
      axios
        .get('http://localhost:5001/weather', {
          params: { lat: latitude, lon: longitude },
        })
        .then((response) => {
          const kelvin = response.data.current.temp;
          const fahrenheit = (9 / 5) * (kelvin - 273) + 32;
          temperature = Math.round(fahrenheit);
          newTemperature();
        })
        .catch((error) => {
          console.log('error');
        });
    })
    .catch((error) => {
      console.log('error :(');
    });
};

const resetCity = function () {
  city = 'Atlanta';
  document.querySelector('#cityname').value = 'Atlanta';
  const curWeatherHeader = document.getElementById('cityQuote');
  curWeatherHeader.textContent = 'Hotlanta! The City of Sweet tea and Sunshine';
  getCurrentTemp();
  updatteLandBasedonTemp();
};

const changeCity = () => {
  // if the #cityname element is changed
  const input = document.querySelector('#cityname');
  input.addEventListener('change', updateValue);

  // update header to display city name and update city variable
  const curWeatherHeader = document.getElementById('cityQuote');
  function updateValue(e) {
    city = e.target.value;
    curWeatherHeader.textContent = 'Current Weather for ' + city;
    getCurrentTemp();
  }
};

const changeSky = () => {
  const input = document.querySelector('#skytype-select');

  input.addEventListener('change', (event) => {
    const skyOutput = document.querySelector('#sky');
    skyOutput.textContent = getSky(event.target.value);
  });
};

const newTemperature = () => {
  const temperatureMessage =  temperature + '\u00B0F';
  document.getElementById('temperature').innerHTML = temperatureMessage;
  updatteLandBasedonTemp();
};

const updatteLandBasedonTemp = () => {
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
    img = 'warm';
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