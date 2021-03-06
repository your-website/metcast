export default class WeatherService {

    _apiBase = 'https://api.openweathermap.org/data/2.5/weather?q=';

    async getResource(town, lang, api) {
      const res = await fetch(`${this._apiBase}${town}&lang=${lang}&units=metric&appid=${api}`);
  
      if (!res.ok) {
        throw new Error(`Could not fetch` +
          `, received ${res.status}`);
      };
      return await res.json();
    };

    async getAllWeather(town, lang, api) {
      const data = await this.getResource(town, lang, api);
      return await this._transformData(data);
    };

    _transformData = (data) => {
      const str = data.weather[0].description;
      const cloud = str.substr(0,1).toUpperCase() + str.substr(1);
      
      return {
        cloud,
        temp: Math.floor(data.main.temp),
        wind: data.wind.speed,
        img: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        town: data.name,
        icon: data.weather[0].icon
      };
    };
  };
  