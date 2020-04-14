import React, { Component } from 'react';
import WeatherService from '../../services/weather-service';

import './results-weather.scss';

export default class ResultsWeather extends Component {
  weatherService = new WeatherService();

  state = {
    data: {
    },
    hasRain: false
  };

  componentDidMount() {
    this.getData();
  };

  componentDidUpdate(prevProps) {
    if (this.props.town !== prevProps.town) {
      this.getData();
    };
  };

  getData = () => {
    const api = '5202b3fb482c3b9762b51c55a72f1230';
    this.weatherService.getAllWeather(this.props.town, 'ru', api)
      .then((res) => {
        this.setState({
          data: res
        });
        this.hasRain(res.cloud);
      });
  };

  getClothes = () => {
    const { temp } = this.state.data;
    let clothes = '';
    let imgClothes = '';
    if(temp > 30) {
      clothes = 'Рекомендуем готовиться к пляжному сезону'
    } else if (temp > 20) {
      clothes = 'Рекомендуем надеть шорты и майку';
    } else if (temp > 13) {
      clothes = 'Рекомендуем надеть брюки и рубашку';
    } else if (temp > 0) {
      clothes = 'Рекомендуем надеть брюки, кофту и куртку';
    } else if (temp < 0 && temp > -10) {
      clothes = 'Рекомендуем надеть брюки, кофту и осеннюю куртку';
    } else if (temp < -10 && temp > -20 ) {
      clothes = 'Рекомендуем надеть туплые штаны, кофту и зимнюю куртку';
    } else {
      clothes = 'Не рекомендуем выходить на улицу, но если выбора неть - наденьте всё, что есть';
    };

    return {
      clothes,
      imgClothes
    };
  };

  hasRain = (cloud) => {
    if (cloud === 'небольшой проливной дождь' || cloud === 'дождь' || cloud === 'гроза') {
      this.setState({ 
        hasRain: true
      });
    } else {
      this.setState({ 
        hasRain: false
      });
    }
  };

  render() {
    const { cloud, town, img, temp, wind } = this.state.data;
    const { hasRain } = this.state;
    const { clothes } = this.getClothes();

    const content = hasRain ? <UmbrellaView /> : null;

    return (
      <div className="results-weather">
        <div className="results-weather__container">
          <h2 className="results-weather__content-title"> { town } </h2>
          <img className="results-weather__img" src={ img } alt="weather"/>
        </div>
        <p className="results-weather__paragraph">
          <i className="results-weather__btn btn btn-light btn-sm fa fa-binoculars"/> { cloud }
        </p>
        <p className="results-weather__paragraph">
          <i className="results-weather__btn btn btn-info btn-sm fa fa-info"/> Температура: { temp} t&deg; 
        </p>
        <p className="results-weather__paragraph">
          <i className="results-weather__btn btn btn-primary btn-sm fa fa-cloud"/> Скорость ветра: { wind } м/с 
        </p>
        <p className="results-weather__paragraph">
          <i className="results-weather__btn btn btn-success btn-sm fa fa-question"/> { clothes } 
        </p>
        { content }
      </div>
    );
  };
};


const UmbrellaView = () => {
  return (
    <React.Fragment>
      <p className="results-weather__paragraph">
        <i className="results-weather__btn btn btn-warning btn-sm fa fa-exclamation"/> Не забудьте зонт <i className="results-weather__btn btn btn-warning btn-sm fa fa-umbrella"/> 
      </p>
    </React.Fragment>
  );
};
