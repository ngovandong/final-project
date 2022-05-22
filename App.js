import { Provider } from 'react-redux';
import { store } from './redux/store';
import React from 'react';
import Navigation from './Navigation';

export default function App()
{
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}