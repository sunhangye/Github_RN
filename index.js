/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './App';
// import Welcome from './src/page/Welcome';
import {
  RootNavigator
} from './src/navigator/AppNavigators';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
