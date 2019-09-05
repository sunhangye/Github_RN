import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import DynamicTabNavigator from '../navigator/DynamicTabNavigator';
import NavigationUtil from '../navigator/NavigationUtil';

import { BackHandler } from 'react-native';
import {NavigationActions} from "react-navigation";
import {connect} from 'react-redux';
import BackPressComponent from '../common/BackPressComponent'

type Props = {};
class Home extends Component<Props> {
  constructor(props) {
    super(props);

    /**
     * 使用 backPress: this.onBackPress 会直接执行， 所以使用箭头函数 或者onBackPress使用箭头函数定义
     */
    this.backPress = new BackPressComponent({
      backPress: this.onBackPress
    });
  }
  componentDidMount() {
    this.backPress.componentDidMount();
  }
  
  componentWillUnmount() {
    this.backPress.componentWillUnmount()
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