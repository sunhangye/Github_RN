import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil'
type Props = {};
export default class App extends Component<Props> {
  
  componentDidMount() {
    this.timer = setTimeout(() => {
      NavigationUtil.resetToHomePape(this.props)
    }, 100);
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to WelcomePage!</Text>
      </View>
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
