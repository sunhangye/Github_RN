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
import { connect } from 'react-redux';

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
};

class DynamicTabNavigator extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    
  }
  _tabNavigator() {
    if (this.tabs) { // 有则返回之前原有的
      return this.tabs;
    }
    // 将配置文件导出
    const { PopularPage, TrendingPage, FavoritePage, MyPage } = TABS;
    // 配置需要的路由文件
    const tabs = { PopularPage, TrendingPage, FavoritePage, MyPage };
    // 动态设置底部标题
    PopularPage.navigationOptions.tabBarLabel = '哈哈'; // 动态配置label
    return this.tabs = createAppContainer(createBottomTabNavigator(tabs, {
       tabBarComponent: (props) => (
         <TabBarComponent theme={this.props.theme} {...props} />
       )
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
    const {theme} = this.props;
    // 渲染底部栏
    return ( 
      <BottomTabBar 
        {...this.props}
        activeTintColor={theme}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  theme: state.theme.theme
});

export default connect(mapStateToProps, null)(DynamicTabNavigator);
