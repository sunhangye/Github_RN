import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation';
// import PopularTab from './PopularTab';
import Toast from 'react-native-easy-toast'
import { connect } from 'react-redux';
import actionCreators from '../action/index';
import PopularItem from '../common/PopularItem';
import NavigationBar from '../common/NavigationBar';
import NavigationUtil from '../navigator/NavigationUtil'
const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const THEME_COLOR = '#678';

type Props = {};

export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    // this.tabNames = ['Java', 'Android', 'iOS', 'PHP', 'ReactNative'];
    this.tabNames = ['Java'];
  }

  // 顶部栏导航动态生成
  _generTab() {
    let tabs = {};
    this.tabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: props => <PopularTabPage {...props} tabLable={item} />,
        navigationOptions: {
          title: item,
        },
      };
    });
    return tabs;
  }

  render() {
    let statusBar = {
      backgroundColor: THEME_COLOR
    }
    const navigationBar = (
        <NavigationBar 
          title={'最热'}
          statusBar={statusBar}
          style={{backgroundColor: THEME_COLOR}}
        />
    );

    const MatetialTab = createAppContainer(createMaterialTopTabNavigator(this._generTab(), {
      tabBarOptions: {
        activeTintColor: 'white', // 设置TabBar选中状态下的标签和图标的颜色
        inactiveTintColor: 'black', // 设置TabBar非选中状态下的标签和图标的颜色
        upperCaseLabel: false, // 是否使标签大写
        tabStyle: styles.tabStyle, // 设置单个tab的样式
        indicatorStyle: styles.indicatorStyle, // 设置 indicator(tab下面的那条线)的样式
        labelStyle: styles.labelStyle, // 设置TabBar标签的样式；
        style: styles.tabsStyle, // 设置整个TabBar的样式
        scrollEnabled: true, // 是否支持 选项卡滚动
        pressOpacity: 1, // 按下标签时的不透明度（支持 iOS 和 Android < 5.0）
      }
    }))
    
    return (
      <View style={styles.containerWrapper}>
        {navigationBar}
        <MatetialTab />
      </View>
    );
  }
}

const PAGE_SIZE = 10; // 设为常量，防止修改

class PopularTab extends Component {
  constructor(props) {
    super(props);
    const { tabLable } = this.props;
    this.storeName = tabLable;
  }

  componentDidMount() {
    this.loadData(false);
  }

  /**
   * 数据容错处理,获取与当前页面有关的数据
   */
  _store() {
    const { popular } = this.props;
    let store = popular[this.storeName];
    if (!store) { // 初始化数据
      return store = {
        items: [],
        isLoading: false,
        projectModels: [],
        hideLoadingMore: true
      };
    }
    return store;
  }

  // 渲染分割线
  _separator() {
    return <View style={{height: 1, backgroundColor: 'red'}} />
  }

  // 渲染列表item
  _renderItem(data) {
    const item = data.item;
    return <PopularItem 
              item={item} 
              onSelect={() => {
                NavigationUtil.goPage({
                  projectModels: item
                }, 'DetailPage')
              }} 
            />
  }

  // 渲染底部组件
  _genIndicator() {
    return this._store().hideLoadingMore ? null : (
      <View style={styles.footerContainer}>
        <ActivityIndicator style={styles.indicatorStyle} />
        <Text>正在加载更多</Text>
      </View>
    )

  }
  // 加载数据
  /**
   * 
   * @param {Boolean} loadMore true: 下拉加载更多；false: 首次加载
   */
  loadData(loadMore) {
    const { onRefreshPopular, onLoadMorePopular } = this.props;
    const url = this.getFetchUrl(this.storeName);
    const store = this._store();
    if (loadMore) { // 下拉加载更多 
      console.log('--onLoadMorePopular--');
      onLoadMorePopular(this.storeName, ++store.pageIndex, PAGE_SIZE, store.items, () => {
        this.refs.toast.show('没有更多了');
      })
    } else { // 首次加载
      onRefreshPopular(this.storeName, url, PAGE_SIZE);
    }
  }

  // 拼接最热模块数据URL 
  getFetchUrl(key) {
    return URL + key + QUERY_STR;
  }

  render() {
    const {tabLable} = this.props;
    const store = this._store();
    
    return (
      <View style={styles.container}>
        <FlatList 
          style={{flex: 1}}
          data={store.projectModels}
          renderItem={data => this._renderItem(data)}
          keyExtractor={item => "" + item.id}
          refreshControl={
            <RefreshControl 
              title={'Loading'}
              titleColor={THEME_COLOR}
              colors={[THEME_COLOR]}
              refreshing={store.isLoading}
              onRefresh={() => { // 上拉加载
                this.loadData(false);
              }}
              tintColor={THEME_COLOR}
              ItemSeparatorComponent={this._separator()}
            />
          }
          ListFooterComponent={() => this._genIndicator()}
          onEndReachedThreshold={0.5}
          onEndReached={() => { // 下拉刷新
            setTimeout(() => { // 确保onMomentumScrollBegin执行
              console.log('--onEndReached--');
              if (this.canLoadMore) {
                this.loadData(true);
                this.canLoadMore = false;
              }
            }, 100) 
          }}
          onMomentumScrollBegin={() => {
            this.canLoadMore = true;
            console.log('--onMomentumScrollBegin--');
            
          }}
        />
        <Toast ref={'toast'} position={'center'} />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  popular: state.popular
});

const mapDispatchToProps = (dispatch) => ({
  // 加载列表数据
  onRefreshPopular(storeName, url, pageSize) {
    dispatch(actionCreators.onRefreshPopular(storeName, url, pageSize))
  },
  // 加载更多数据
  onLoadMorePopular(storeName, pageIndex, pageSize, items, callback) {
    dispatch(actionCreators.onLoadMorePopular(storeName, pageIndex, pageSize, items, callback))
  }
});

const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab);

const styles = StyleSheet.create({
  containerWrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  tabStyle: {
    // minWidth: 8, // minWidth会导致tabView初次加载闪烁
    padding: 0,
  },
  indicatorStyle: {
    height: 1,
    backgroundColor: 'white',
  },
  tabsStyle: {
    backgroundColor: '#678',
    alignContent: 'center'
  },
  footerContainer: {
    alignItems: "center"
  },
  labelStyle: {
    fontSize: 13,
  }
})