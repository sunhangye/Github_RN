import React, { Component } from 'react'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import NavigationUtil from './NavigationUtil';
import TrendingPage from '../page/Trending';
import FavoritePage from '../page/Favorite';
import MyPage from '../page/My';
import PopularPage from '../page/Popular';
import {BottomTabBar} from 'react-navigation-tabs';

const TABS = { // 配置页面路由
  PopularPage: {
    screen: PopularPage,
    navigationOptions: {
      tabBarLabel: '最热',
      tabBarIcon: ({tintColor, focused}) => (
        <MaterialIcons 
          name={'whatshot'}
          size={26}
          style={{color: tintColor}}
        />
      )
    }
  },
  TrendingPage: {
    screen: TrendingPage,
    navigationOptions: {
      tabBarLabel: '趋势',
      tabBarIcon: ({tintColor, focused}) => (
        <Ionicons 
          name={'md-trending-up'}
          size={26}
          style={{color: tintColor}}
        />
      )
    }
  },
  FavoritePage: {
    screen: FavoritePage,
    navigationOptions: {
      tabBarLabel: '收藏',
      tabBarIcon: ({tintColor, focused}) => (
        <MaterialIcons 
          name={'favorite'}
          size={26}
          style={{color: tintColor}}
        />
      )
    }
  },
  MyPage: {
    screen: MyPage,
    navigationOptions: {
      tabBarLabel: '我的',
      tabBarIcon: ({tintColor, focused}) => (
        <Entypo 
          name={'app-store'}
          size={26}
          style={{color: tintColor}}
        />
      )
    }
  },
}

export default class DynamicTabNavigator extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    
  }
  _tabNavigator() {
    // 将配置文件导出
    const { PopularPage, TrendingPage, FavoritePage, MyPage } = TABS;
    // 配置需要的路由文件
    const tabs = { PopularPage, TrendingPage, FavoritePage, MyPage };
    // 动态设置底部标题
    PopularPage.navigationOptions.tabBarLabel = '哈哈'; // 动态配置label
    return createAppContainer(createBottomTabNavigator(tabs, {
       tabBarComponent: TabBarComponent
    }))

  }
  render() {
    const Tab = this._tabNavigator();
    return (
      <Tab />
    )
  }
}

class TabBarComponent extends Component {
  constructor(props) {
    super(props);
    this.theme = {
      tintColor: props.activeTintcolor,
      updateTime: new Date().getTime()
    }
  }
  render() {
    // 取出路由和索引
    const {routes, index} = this.props.navigation.state;
    // 判断是否有params
    if (routes[index].params) {
      const {theme} = routes[index].params;
      // 当前时间大于之前时间，更新主题
      if (theme && theme.updateTime > this.theme.updateTime) {
        this.theme = theme;
      }
    }
    // 渲染底部栏
    return ( 
      <BottomTabBar 
        {...this.props}
        activeTintColor={this.theme.tintColor || this.props.activeTintColor}
      />
    )
  }
}
