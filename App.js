import React, { Component } from 'react'
import {
  RootNavigator
} from './src/navigator/AppNavigators';
import { Provider } from 'react-redux';
import store from './src/store';

console.disableYellowBox = true;
console.warn('YellowBox is disabled.');
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    )
  }
}
