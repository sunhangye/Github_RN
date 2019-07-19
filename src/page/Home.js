import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import DynamicTabNavigator from '../navigator/DynamicTabNavigator';
import NavigationUtil from '../navigator/NavigationUtil';

type Props = {};
export default class App extends Component<Props> {
  
  

  render() {

    NavigationUtil.navigation = this.props.navigation
    return (
      <DynamicTabNavigator />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
