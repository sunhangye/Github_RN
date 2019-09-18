import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation';
import Toast from 'react-native-easy-toast'
import { connect } from 'react-redux';
import actionCreators from '../action/index';
import PopularItem from '../common/PopularItem';
import TrendingItem from '../common/TrendingItem';
import NavigationBar from '../common/NavigationBar';
import NavigationUtil from '../navigator/NavigationUtil';
import FavoriteDao from '../expand/dao/FavoriteDao';
import { FLAG_STORAGE } from '../expand/dao/DataStore';
import FavoriteUtil from '../utils/FavoriteUtil';
import EventBus from 'react-native-event-bus';
import EventTypes from '../utils/EventTypes';

const THEME_COLOR = '#678';

export default class Favorite extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let statusBar = {
      backgroundColor: THEME_COLOR
    }
    // 状态栏
    const navigationBar = (
        <NavigationBar 
          title={'收藏'}
          statusBar={statusBar}
          style={{backgroundColor: THEME_COLOR}}
        />
    );

    const MatetialTab = createAppContainer(createMaterialTopTabNavigator({
      'Popular': {
        screen: props => <FavoriteTabPage {...props} flag={FLAG_STORAGE.flag_popular} />,
        navigationOptions: {
          title: 'Popular',
        },
      },
      'Trending': {
        screen: props => <FavoriteTabPage {...props} flag={FLAG_STORAGE.flag_trending} />,
        navigationOptions: {
          title: 'Trending',
        },
      }
    }, {
      tabBarOptions: {
        activeTintColor: 'white', // 设置TabBar选中状态下的标签和图标的颜色
        inactiveTintColor: 'black', // 设置TabBar非选中状态下的标签和图标的颜色
        upperCaseLabel: false, // 是否使标签大写
        tabStyle: styles.tabStyle, // 设置单个tab的样式
        indicatorStyle: styles.indicatorStyle, // 设置 indicator(tab下面的那条线)的样式
        labelStyle: styles.labelStyle, // 设置TabBar标签的样式；
        style: styles.tabsStyle, // 设置整个TabBar的样式
        scrollEnabled: false, // 是否支持 选项卡滚动
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

class FavoriteTab extends Component {
  constructor(props) {
    super(props);
    const { flag } = this.props;
    this.storeName = flag;
    this.favoriteDao = new FavoriteDao(flag);
  }

  componentDidMount() {
    
    this.loadData(true);
    EventBus.getInstance().addListener(EventTypes.BOTTOM_NAV_SELECT, this.listener = (data) => {
      if (data.to === 2) {
        this.loadData(false);
      }
    })
  }

  componentWillUnmount() {
    EventBus.getInstance().removeListener(this.listener);
  }
  /**
   * 数据容错处理,获取与当前页面有关的数据
   */
  _store() {
    const { favorite } = this.props;
    let store = favorite[this.storeName];
    if (!store) { // 初始化数据
      return store = {
        isShowLoading: false,
        projectModels: [],
      };
    }
    return store;
  }

  // 渲染分割线
  _separator() {
    return <View style={{height: 1, backgroundColor: 'red'}} />
  }
  onFavorite(item, isFavorite) {
    FavoriteUtil.onFavorite(this.favoriteDao, item, isFavorite, this.storeName);
    // 发布收藏变化事件
    const favoriteTabType = this.storeName === FLAG_STORAGE.flag_popular ? EventTypes.FAVORITE_CHANGE_POPULAR : EventTypes.FAVORITE_CHANGE_TRENDING;
    
    EventBus.getInstance().fireEvent(favoriteTabType);
  }
  // 渲染列表item
  _renderItem(data) {
    const item = data.item;
    const Item = this.storeName === FLAG_STORAGE.flag_popular ? PopularItem : TrendingItem;
    
    return <Item
              projectModel={item} 
              onSelect={(callback) => {
                NavigationUtil.goPage({
                  projectModel: item,
                  flag: this.storeName,
                  callback
                }, 'DetailPage')
              }} 
              onFavorite={(item, isFavorite) => this.onFavorite(item, isFavorite)}
            />
  }


  /**
   * 加载数据
   * @param {Boolean} loadMore true: 下拉加载更多；false: 首次加载
   */
  loadData(isShowLoading) {
    const { onLoadFavorateData } = this.props;
    onLoadFavorateData(this.storeName, isShowLoading)
    
  }

  render() {
    const store = this._store();
    
    return (
      <View style={styles.container}>
        <FlatList 
          style={{flex: 1}}
          data={store.projectModels}
          renderItem={data => this._renderItem(data)}
          keyExtractor={item => "" + (item.item.id || item.item.fullName)}
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
          onEndReachedThreshold={0.5}
          onEndReached={() => { // 下拉刷新
            setTimeout(() => { // 确保onMomentumScrollBegin执行
              if (this.canLoadMore) {
                this.loadData(true);
                this.canLoadMore = false;
              }
            }, 100) 
          }}
          onMomentumScrollBegin={() => {
            this.canLoadMore = true;
            
          }}
        />
        <Toast ref={'toast'} position={'center'} />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  favorite: state.favorite,
});

const mapDispatchToProps = (dispatch) => ({
  // 加载列表数据
  onLoadFavorateData(flag, isShowLoading) {
    dispatch(actionCreators.onLoadFavoriteData(flag, isShowLoading))
  }
});

const FavoriteTabPage = connect(mapStateToProps, mapDispatchToProps)(FavoriteTab);

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