

if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(position =>{
     longitude = position.coords.longitude;
     latitude = position.coords.latitude;

     fetch('/weather', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        latitude: latitude,
        longitude: longitude
      })
    }).then(res => res.json()).then(data => {
      setWeatherData(data);
    })
  })

  const icon = new Skycons({ color: '#fff' });
  const locationElement = document.querySelector('[data-location]');
  const temperatureElement = document.querySelector('[data-temperature]');
  const precipitationElement = document.querySelector('[data-precipitation]');
  const windElement = document.querySelector('[data-wind]');

  function setWeatherData(data){
    locationElement.textContent = data.timezone;
    temperatureElement.textContent = `${Math.floor(data.currently.temperature)}°C`;
    precipitationElement.textContent = `${data.currently.precipProbability * 100}%`;
    windElement.textContent = `${data.currently.windSpeed} km/h`;
    icon.set('icon', data.currently.icon);
    icon.play();
  };

  };
  