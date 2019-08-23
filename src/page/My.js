import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import NewNavigationBar from '../utils/navigationBar';

type Props = {};
const THEME_COLOR = '#678';

export default class App extends Component<Props> {
  
  navigationBarProps() {
    return {
      title: 'APP1',
      rightIcon: {
        name: 'rocket',
        size: 20,
        color: '#333'
      }
    }
  }

  getRightButton() {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {}}
        >
          <View style={{padding: 8, paddingLeft: 12}}>
            <Feather 
              name={'search'}
              size={24}
              color={'#fff'}
            />
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  getLeftButton() {
    return (
      <View style={{flexDirection: 'row',alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {}}
        >
          <View style={{padding: 8, paddingLeft: 12}}>
            <Ionicons 
              name={'ios-arrow-back'}
              size={26}
              color={'#fff'}
            />
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  render() {
    let statusBar = {
      barStyle: 'light-content',
      backgroundColor: THEME_COLOR
    }
    let navigationBar = (
        <NavigationBar 
          title={'我的'}
          statusBar={statusBar}
          style={{backgroundColor: THEME_COLOR}}
          leftButton={this.getLeftButton()}
          rightButton={this.getRightButton()}
        />
    );
    return (
      <View style={styles.container}>
        {
          // <NewNavigationBar 
          //   navigationBarProps={this.navigationBarProps()}
          // />
        }
        {navigationBar}
        <View style={styles.txtContainer}>
          <Text style={styles.welcome}>Welcome to My!</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txtContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  navIconContainer: {
    
  }
});
