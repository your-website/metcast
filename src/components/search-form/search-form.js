import React, { Component } from 'react';
import WeatherService from '../../services/weather-service';

import './search-form.scss';
import ResultsWeather from '../results-weather';
import ErrorIndicator from '../error-indicator';

export default class SearchForm extends Component {

  weatherService = new WeatherService();

  state = {
    input: '',
    town: 'Москва',
    error: false,
    hasError: false
  };

  componentDidCatch() {
    this.setState({
      hasError: true
    });
  };

  inputChange = (event) => {
    const input = event.target.value
    this.setState(() => {
      return {
        input
      };
    });
  };

  changeTown = (event) => {
    event.preventDefault();
    if (this.state.input === '') {
      this.setError();
      return;
    };

    this.setState(() => {
      return {
        town: this.state.input,
        error: false,
        input: ''
      };
    });
  };

  setError = () => {
    this.setState(() => {
      return {
        error: true
      };
    });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />
    };

    const { error } = this.state;
    const contentError = error ? <ErrorView /> : null;

    return (
      <div>
        <form className="form">
          <div className="form__container">
            { contentError }
            <input className="form-control"
                  onChange={ this.inputChange }
                  value={ this.state.input }
                  placeholder="введите город"/>
            <button onClick={ this.changeTown }
                    className="form__button btn btn-primary">click</button>
          </div>
        </form>
        <ResultsWeather town={ this.state.town } setError={ this.setError } />
      </div>
    );
  };
};

const ErrorView = () => {
  return (
    <React.Fragment>
      <span className="form__error">Введите название города</span>
    </React.Fragment>
  );
};