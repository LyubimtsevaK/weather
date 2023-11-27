import React, {useState} from 'react';
import Sun from './pic/sun.gif'
import './App.css';
// import lightning from './pic/lightning.gif'
import planet from './pic/planet.gif'

// import translate from 'google-translate-api';

const api = '3ae7d0ac03e6f1dcc1b48f9a6524014f';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});

  const weatherTemp = weather.main && weather.main.temp
  const location = weather.name && weather.sys && `${weather.name}, ${weather.sys.country}`;
  const weatherMain = weather.weather && weather.weather[0] && weather.weather[0].main
  const tempMax = weather.main && weather.main.temp_max
  const tempMin = weather.main && weather.main.temp_min

    const handleChange = (e) => {
        setCity(e.target.value);
    };

    const search = async (e) => {
        if (e.key === "Enter") {
          try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api}`
            );
    
            const result = await response.json();
            setCity("");
            setWeather(result);
            console.log(result);
    
          } catch (error) {
            console.log("Ошибка при выполнении запроса:", error);
          } 
        }
      };
  return (
    <div className='head'>
    <img src={Sun} alt='' className='sun'/>
      <input
        type='text'
        value={city}
        onChange={handleChange}
        onKeyPress={search}
        placeholder='Введите город'
        className='input'
      />
      <div>
        <div className='location'>
        {location || ''}
        </div>
      </div>
      <div className='temp'>
        {typeof weatherTemp === 'number' ? `${Math.round(weatherTemp)}°` : ''}
      </div>
      <div className='tempMax'>
        {typeof tempMax === 'number' ? `↑${Math.round(tempMax)}°` : ''}
      </div>
      <div className='tempMin'>
        {typeof tempMin === 'number' ? `↓${Math.round(tempMin)}°` : ''}
      </div>
      <div className='weatherMain'>
        {weatherMain}
      </div>
      <img src={planet} alt='' className='planet'/>
    </div>
  );
}

export default App;