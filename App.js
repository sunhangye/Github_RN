import React, { Component } from 'react'
import {
  RootNavigator
} from './src/navigator/AppNavigators';
import { Provider } from 'react-redux';
import store from './src/store';

console.disableYellowBox = true;
// 控制台可查看http请求
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
