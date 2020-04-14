import React from 'react';
import SearchForm from '../search-form';

import './main.scss';

const Main = () => {
  return (
    <div className="main">
      <h1 className="main__content-title">Умный сервис прогноза погоды</h1>
      <SearchForm />
    </div>
  );
};

export default Main;