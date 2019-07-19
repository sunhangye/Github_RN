import React, { Component } from "react";
import {
  createStackNavigator, createSwitchNavigator, createAppContainer
} from 'react-navigation';
import WelcomePage from '../page/Welcome';
import HomePage from '../page/Home';
import DetailPage from '../page/Detail';


const InitNavigator = createStackNavigator({
  WelcomePage: {
    screen: WelcomePage,
    navigationOptions: {
      header: null, // 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
    }
  },
});

const MainNavigator = createStackNavigator({
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      header: null,
    }
  },
  DetailPage: {
    screen: DetailPage,
    navigationOptions: {
      header: null,
    }
  },
}, {
  defaultNavigationOptions: {
    header: null,
  }
});

const AppNavigator = createSwitchNavigator({
  Init: InitNavigator,
  Main: MainNavigator
}, {
  navigationOptions: {
    header: null, // 可以通过将header设为null 来禁用StackNavigator的Navigation Bar
  }
})

export const AppContainer = createAppContainer(AppNavigator);

