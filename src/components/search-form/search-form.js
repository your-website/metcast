import React, { Component } from 'react';
import WeatherService from '../../services/weather-service';

import './search-form.scss';
import ResultsWeather from '../results-weather';

export default class SearchForm extends Component {

  weatherService = new WeatherService();

  state = {
    town: '',
    pass: 'Москва'
  };

  inputChange = (event) => {
    const town = event.target.value
    this.setState(() => {
      return {
        town
      };
    });
  };

  changeTown = (event) => {
    event.preventDefault();
    this.setState(() => {
      return {
        pass: this.state.town
      }
    })
  };

  render() {
    return (
      <div>
        <form className="form">
          <div className="form__container">
            <input className="form-control"
                  onChange={ this.inputChange }
                  value={ this.state.town }
                  placeholder="введите город"/>
            <button onClick={ this.changeTown }
                    className="form__button btn btn-primary">click</button>
          </div>
        </form>
        <ResultsWeather town={ this.state.pass } />
      </div>
    );
  };
};
