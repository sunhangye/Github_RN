import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import DynamicTabNavigator from '../navigator/DynamicTabNavigator';
import NavigationUtil from '../navigator/NavigationUtil';

import { BackHandler } from 'react-native';
import {NavigationActions} from "react-navigation";
import {connect} from 'react-redux';

type Props = {};
class Home extends Component<Props> {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  /**
   * 首页处理 Android 中的物理返回键
   */
  onBackPress() { 
    const {nav, dispatch} = this.props;
    
    if (nav.routers[1].index === 0) { //如果RootNavigator中的MainNavigator的index为0(为homePage)，则不处理返回事件
      return;
    }
    dispatch(NavigationActions.back());
  }

  
  render() {
    NavigationUtil.navigation = this.props.navigation;
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

const mapState = (state) => ({
  nav: state.nav
})

export default connect(mapState)(Home);