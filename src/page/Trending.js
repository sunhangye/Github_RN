import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl, ActivityIndicator, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation';
import Toast from 'react-native-easy-toast'
import { connect } from 'react-redux';
import actionCreators from '../action/index';
import TrendingItem from '../common/TrendingItem';
import NavigationBar from '../common/NavigationBar';
import TrendingDialog, { timeSpan } from '../common/TrendingDialog';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import NavigationUtil from '../navigator/NavigationUtil';


const URL = 'https://github.com/trending/';
const QUERY_STR = '?since=daily';
const THEME_COLOR = '#678';
const EVENT_TYPE_TIME_SPAN_CHANGE = 'EVENT_TYPE_TIME_SPAN_CHANGE';
type Props = {};

export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    // this.tabNames = ['Java', 'Android', 'iOS', 'PHP', 'ReactNative'];
    this.tabNames = ['javascript'];

    this.state = {
      timeSpan: timeSpan[0],
    }
  }

  // 顶部栏导航item动态生成
  _generTab() {
    let tabs = {};
    this.tabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: props => <TrendingTabPage {...props} timeSpan={this.state.timeSpan} tabLable={item} />,
        navigationOptions: {
          title: item,
        },
      };
    });
    return tabs;
  }
  renderTitleView() {
    return (
      <TouchableOpacity 
        underlayColor='transparent'
        onPress={() => this.dialog.show()}>
        <View style={{flexDirection:'row', alignItems: 'center'}}>
        <Text style={{
          fontSize: 18,
          color: '#FFF',
          fontWeight: '400'
        }}>
          趋势 {this.state.timeSpan.showText}
        </Text>
        <MaterialIcons 
          name={'arrow-drop-down'}
          size={22}
          style={{color: '#fff'}}
        />
        </View>
      </TouchableOpacity>
    )
  }
  onSelectTimeSpan(tab) {
    this.dialog.dismiss();
    this.setState({
      timeSpan: tab,
    })
    // 调用切换时间参数改变时间通知
    DeviceEventEmitter.emit(EVENT_TYPE_TIME_SPAN_CHANGE, tab);
  }
  renderTrendingDialog() {
    return (
      <TrendingDialog 
        ref={(dialog) => {this.dialog = dialog}}
        onSelect={(tab) => this.onSelectTimeSpan(tab)}
      />
    )
  }
  _
  render() {
    let statusBar = {
      backgroundColor: THEME_COLOR
    }
    const navigationBar = (
        <NavigationBar 
          titleView={this.renderTitleView()}
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
        {this.renderTrendingDialog()}
      </View>
    );
  }
}

const PAGE_SIZE = 10; // 设为常量，防止修改

class TrendingTab extends Component {
  constructor(props) {
    super(props);
    const { tabLable, timeSpan } = this.props;
    this.storeName = tabLable;
    this.timeSpan = timeSpan;
    console.log(this.props.timeSpan);
    
  }

  componentDidMount() {
    this.loadData(false);
    this.timeSpanChangeListen = DeviceEventEmitter.addListener(EVENT_TYPE_TIME_SPAN_CHANGE, (tab) => {
      this.setState({
        timeSpan: tab,
      });
      // this.loadData();
    })
  }

  componentWillUnmount() {
    if (this.timeSpanChangeListen) {
      this.timeSpanChangeListen.remove();
    }
  }
  
  /**
   * 数据容错处理,获取与当前页面有关的数据
   */
  _store() {
    const { trending } = this.props;
    let store = trending[this.storeName];
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
    return <TrendingItem 
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

  /**
   * 加载数据
   * @param {Boolean} loadMore true: 下拉加载更多；false: 首次加载
   */
  loadData(loadMore) {
    const { onRefreshTrending, onLoadMoreTrending } = this.props;
    const url = this.getFetchUrl(this.storeName);
    const store = this._store();
    if (loadMore) { // 下拉加载更多 
      console.log('--onLoadMoreTrending--');
      onLoadMoreTrending(this.storeName, ++store.pageIndex, PAGE_SIZE, store.items, () => {
        this.refs.toast.show('没有更多了');
      })
    } else { // 首次加载
      onRefreshTrending(this.storeName, url, PAGE_SIZE);
    }
  }

  // 拼接最热模块数据URL 
  getFetchUrl(key) {
    return URL + key + '?' + this.timeSpan.searchParam;
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
          keyExtractor={item => "" + item.fullName}
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
          onEndReachedThreshold={0.1}
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
  trending: state.trending
});

const mapDispatchToProps = (dispatch) => ({
  // 加载列表数据
  onRefreshTrending(storeName, url, pageSize) {
    dispatch(actionCreators.onRefreshTrending(storeName, url, pageSize))
  },
  // 加载更多数据
  onLoadMoreTrending(storeName, pageIndex, pageSize, items, callback) {
    dispatch(actionCreators.onLoadMoreTrending(storeName, pageIndex, pageSize, items, callback));
  }
});

const TrendingTabPage = connect(mapStateToProps, mapDispatchToProps)(TrendingTab);

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
    minWidth: 8,
    padding: 0
  },
  indicatorStyle: {
    height: 1,
    backgroundColor: 'white',
  },
  tabsStyle: {
    backgroundColor: '#678',
  },
  footerContainer: {
    alignItems: "center"
  },
  labelStyle: {
    
  }
})