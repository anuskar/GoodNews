import React from 'react';
import ReactDOM from 'react-dom';
import MainArticleCard from './MainArticleCard';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainArticleCard />, div);
  ReactDOM.unmountComponentAtNode(div);
});